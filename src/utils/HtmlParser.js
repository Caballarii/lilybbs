import Cheerio from "cheerio-without-node-native";
import moment from 'moment';

export let parseTopTen = (html) => {
    let $ = Cheerio.load(html);
    let result = [];
    $("tr").each(function (i, e) {
        if (i != 0) {
            let node = {};
            let item = $(this);
            node.board = trim(item.find("td").eq(1).text());
            node.title = trim(item.find("td").eq(2).text());
            node.url = item.find("td").eq(2).children("a").eq(0).attr("href");
            node.author = trim(item.find("td").eq(3).text());
            node.count = trim(item.find("td").eq(4).text());
            //console.log(node);
            result.push(node);
        }
    });
    return result;
}

export let parsePost = (html) => {
    let $ = Cheerio.load(html);
    let result = {};
    result.nodes = [];

    if (html.indexOf('</script>错误! 错误的文件名!') != -1) {
        return null;
    }

    let count = html.match(/本主题共有 ([0-9]+) 篇文章/)[1];
    result.count = count;
    result.pageIndex = 0;
    result.pageNum = count == 0 ? 1 : Math.ceil(count / 30);

    $("textarea").each(function (i, e) {
        let node = {};
        let content = $(this).text();
        if (i === 0) {
            let title = content.match(/标[\s]+题:([^\n]+)/)[1];
            result.title = trim(title);

            let board = content.match(/信区: ([a-zA-Z_]+)/)[1];
            result.board = trim(board);
        }

        let author = content.match(/发信人:([^,]+)/)[1];
        node.author = trim(author);

        let dateStr = content.match(/南京大学小百合站 \(([^\)]+)\)/)[1];
        node.date = moment(trim(dateStr), "ddd MMM D HH:mm:ss YYYY").format("YYYY年M月D日 HH:mm:ss");

        let text = content.match(/南京大学小百合站 [^\)]+\)([\s\S]+)(?=\-\-[\s]+)/)[1];

        text = reduceReturn(text);
        //console.log(text);

        let mixedText = dividePicAndText(text);
        //node.text=parseText(text);
        node.text = mixedText;
        //node.body=trim(item.text());
        result.nodes.push(node);
    });

    return result;
}

let dividePicAndText = (text) => {
    let picReg = new RegExp("http[s]?://[^\\s,，。？]+.(jpg|png|jpeg)(?![a-zA-Z0-9])");

    let result = [];
    let picIndex = text.search(picReg);
    if (picIndex == -1) {
        let teArr=text.split('\n');
        if(teArr.length<200){
            return [{
                "text": parseText(text)
            }];
        }
        else{
            let length=teArr.length;
            let count=length/100+(length%100!=0);
            let res=[];
            for(let i=0;i<count;i++){
                res.push({
                    "text":parseText(teArr.slice(100*i,100*i+100).join('\n')+(i+1==count?'':'\n'))
                });
            }
            return res;
        }       
    } else {
        let pic = picReg.exec(text)[0];
        let resultArr = [];
        let index = text.indexOf(pic);
        let length = pic.length;

        if (index != 0) {
            resultArr.push({
                "text": parseText(text.substring(0, index))
            });
        }
        resultArr.push({
            "image": pic
        });
        if (index + length + 1 < text.length) {
            resultArr = [...resultArr, ...dividePicAndText(text.substring(index + length))];
        }

        return resultArr;
    }
}

let parseText = (text) => {

    let urlReg = new RegExp("http[s]?://[^\\s,，。？]+");
    let colorReg = new RegExp("\\[1;3[0-7]m[^\\[]+\\[m");
    let emojiReg = new RegExp("\\[[:|;][^\\]]+\\]");
    let colorIndex = text.search(colorReg);
    let urlIndex = text.search(urlReg);
    let emojiIndex = text.search(emojiReg);

    if (urlIndex == -1 && colorIndex == -1 && emojiIndex == -1) {
        return [{
            "text": text
        }];       
    } else if (colorIndex != -1 && (urlIndex == -1 || urlIndex > colorIndex) && (emojiIndex == -1 || emojiIndex > colorIndex)) {
        let color = colorReg.exec(text)[0];
        let resultArr = [];
        let index = text.indexOf(color);
        let length = color.length;

        if (index != 0) {
            resultArr = [...parseText(text.substring(0, index))];
        }
        let node = {};
        switch (color.charAt(4)) {
            case '0':
                node.color = '#000000';
                break;
            case '1':
                node.color = '#e00000';
                break;
            case '2':
                node.color = '#008000';
                break;
            case '3':
                node.color = '#808000';
                break;
            case '4':
                node.color = '#0000ff';
                break;
            case '5':
                node.color = '#d000d0';
                break;
            case '6':
                node.color = '#33a0a0';
                break;
            case '7':
                node.color = '#000000';
                break;
        }
        node.text = color.substring(6, color.length - 2);
        resultArr.push(node);
        if (index + 1 + length < text.length) {
            resultArr = [...resultArr, ...parseText(text.substring(index + length))];
        }
        return resultArr;
    } else if (urlIndex != -1 && (colorIndex == -1 || colorIndex > urlIndex) && (emojiIndex == -1 || emojiIndex > urlIndex)) {
        let url = urlReg.exec(text)[0];
        let resultArr = [];
        let index = text.indexOf(url);
        let length = url.length;

        if (index != 0) {
            resultArr = [...parseText(text.substring(0, index))];
        }
        resultArr.push({
            "url": url
        });
        if (index + 1 + length < text.length) {
            resultArr = [...resultArr, ...parseText(text.substring(index + length))];
        }
        return resultArr;
    } else if (emojiIndex != -1 && (colorIndex == -1 || colorIndex > emojiIndex) && (urlIndex == -1 || urlIndex > emojiIndex)) {
        let emoji = emojiReg.exec(text)[0];
        let resultArr = [];
        let index = text.indexOf(emoji);
        let length = emoji.length;

        if (index != 0) {
            resultArr = [...parseText(text.substring(0, index))];
        }
        let node = {};
        switch (emoji) {
            case '[:s]':
                node.emoji = 2;
                break;
            case '[:O]':
                node.emoji = 0;
                break;
            case '[:|]':
                node.emoji = 3;
                break;
            case '[;cool]':
                node.emoji = 4;
                break;
            case '[:$]':
                node.emoji = 6;
                break;
            case '[:X]':
                node.emoji = 7;
                break;
            case '[:\'(]':
                node.emoji = 9;
                break;
            case '[:-|]':
                node.emoji = 10;
                break;
            case '[:@]':
                node.emoji = 11;
                break;
            case '[:P]':
                node.emoji = 12;
                break;
            case '[:D]':
                node.emoji = 13;
                break;
            case '[:)]':
                node.emoji = 14;
                break;
            case '[:(]':
                node.emoji = 15;
                break;
            case '[:U]':
                node.emoji = 16;
                break;
            case '[:Q]':
                node.emoji = 18;
                break;
            case '[:T]':
                node.emoji = 19;
                break;
            case '[;P]':
                node.emoji = 20;
                break;
            case '[;-D]':
                node.emoji = 21;
                break;
            case '[:K]':
                node.emoji = 25;
                break;
            case '[:!]':
                node.emoji = 26;
                break;
            case '[:L]':
                node.emoji = 27;
                break;
            case '[:C-]':
                node.emoji = 29;
                break;
            case '[:?]':
                node.emoji = 32;
                break;
            case '[;X]':
                node.emoji = 34;
                break;
            case '[:H]':
                node.emoji = 36;
                break;
            case '[;bye]':
                node.emoji = 39;
                break;
            case '[:-b]':
                node.emoji = 40;
                break;
            case '[:-8]':
                node.emoji = 41;
                break;
            case '[;PT]':
                node.emoji = 42;
                break;
            case '[:hx]':
                node.emoji = 44;
                break;
            case '[;K]':
                node.emoji = 47;
                break;
            case '[:E]':
                node.emoji = 49;
                break;
            case '[:-(]':
                node.emoji = 50;
                break;
            case '[;hx]':
                node.emoji = 51;
                break;
            case '[:-v]':
                node.emoji = 53;
                break;
            case '[;xx]':
                node.emoji = 54;
                break;
        }
        resultArr.push(node);
        if (index + 1 + length < text.length) {
            resultArr = [...resultArr, ...parseText(text.substring(index + length))];
        }
        return resultArr;
    }
}

export let parseBoard = (html) => {
    let $ = Cheerio.load(html);
    let result = [];
    $("tr").each(function (i, e) {
        let node = {};
        let item = $(this);
        if (/^\d+$/.test(trim(item.children("td").eq(0).html()))) {
            node.no = trim(item.children("td").eq(0).text());
            node.author = trim(item.children("td").eq(2).text());
            node.time = trim(item.children("td").eq(3).text());
            node.url = item.find("td").eq(4).children("a").eq(0).attr("href");
            node.title = trim(item.find("td").eq(4).text()).substring(2);
            node.popular = trim(item.children("td").eq(5).text());

            result.push(node);
        }
    });
    result.sort((a, b) => {
        return a.no < b.no;
    })
    return result;
}

export let parseHotSpot = (html) => {
    let $ = Cheerio.load(html);
    let result = [];
    let flag=0;
    $("tr").each(function(i,e){
        let item = $(this);
        if(item.children("td[colspan='2']").length!=0){
            result.push({
                key:flag,
                data:[]
            })
            flag++;
        }
        else{
            item.children("td").each(function(i1,e1){
                let pItem=$(this);
                if(pItem.find("a").length==0){
                    return;
                }
                let node={};
                node.title=trim(pItem.find("a").eq(0).text());
                node.url=pItem.find("a").eq(0).attr("href");
                node.board=trim(pItem.find("a").eq(1).text());
                result[flag-1].data.push(node);
            })
        }
    });
    
    result=result.map(info=>{
        switch(info.key){
            case 0:info.key='本站系统';return info;
            case 1:info.key='南京大学';return info;
            case 2:info.key='乡情校谊';return info;
            case 3:info.key='电脑技术';return info;
            case 4:info.key='学术科学';return info;
            case 5:info.key='文化艺术';return info;
            case 6:info.key='体育娱乐';return info;
            case 7:info.key='感性休闲';return info;
            case 8:info.key='新闻信息';return info;
            case 9:info.key='百合广角';return info;
            case 10:info.key='校务信箱';return info;
            case 11:info.key='社团群体';return info;
            default: return info;
        }
    });

    return result;
}

export let parseUserInfo = (html) => {
    let $ = Cheerio.load(html);
    let result = {};
    
    result.id=trim($("tr").eq(0).find("td").eq(1).text());
    result.nick=trim($("tr").eq(1).find("input").val());
    result.total=trim($("tr").eq(2).find("td").eq(1).text());
    result.today=trim($("tr").eq(3).find("td").eq(1).text());
    result.mail=trim($("tr").eq(4).find("td").eq(1).text());
    result.loginCount=trim($("tr").eq(5).find("td").eq(1).text());
    result.loginTime=trim($("tr").eq(6).find("td").eq(1).text());
    result.address=trim($("tr").eq(7).find("input").val());
    result.createTime=trim($("tr").eq(8).find("td").eq(1).text());
    result.lastLoginTime=trim($("tr").eq(9).find("td").eq(1).text());
    result.ip=trim($("tr").eq(10).find("td").eq(1).text());
    result.email=trim($("tr").eq(11).find("input").val());
    result.birthday=$("tr").eq(12).find("input").eq(0).val()+'-'
                    +$("tr").eq(12).find("input").eq(1).val()+'-'
                    +$("tr").eq(12).find("input").eq(2).val();
    result.gender=$("tr").eq(13).find("input:checked").val();
    result.exptype=$("tr").eq(14).find("input:checked").val();

    return result;
}

let trim = (x) => {
    return x.replace(/^\s+|\s+$/g, '');
}

let reduceReturn = (x) => {
    
    let result=x.replace(/^[\n|\r]+|[\n\r]+$/g, '').replace(/[\n|\r]+/g, '\n');

    let strArr=result.split('\n');
    strArr=strArr.map(info=>{
        let length=getLength(info);
        if((length<76||length>84)){
            info+='\n';
        }
        return info;
    });
    result=strArr.join('');
    return result;

}

let getLength = (s) => {
    var len = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.substr(i, 1);
        var ts = escape(c);
        if (ts.substring(0, 2) == "%u") {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}