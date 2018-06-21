import Cheerio from "cheerio-without-node-native";

export let parseTopTen=(html)=>{
    let $=Cheerio.load(html);
    let result=[];
    $("tr").each(function(i, e) {
        if(i!=0){
            let node={};
            let item=$(this);
            node.board=trim(item.find("td").eq(1).text());
            node.title=trim(item.find("td").eq(2).text());
            node.url=item.find("td").eq(2).children("a").eq(0).attr("href");
            node.author=trim(item.find("td").eq(3).text());
            node.count=trim(item.find("td").eq(4).text());
            //console.log(node);
            result.push(node);
        }
    });
    return result;
}

let trim=(x)=> {
    return x.replace(/^\s+|\s+$/g,'');
}