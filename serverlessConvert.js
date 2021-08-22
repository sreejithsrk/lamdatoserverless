function forServerless(myString){
    const camel=myString.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase()}); 
    const firstupdate ="const "+camel+" =";
    const secnd = "module.exports ={\n\t"+camel+"\n};"
    const normal= myString.replace(/-([a-z])/g, function (g) { return " "+g[1].toUpperCase()}); 
    const servlss="  # "+normal+"\n  "+myString+":\n    handler: handler."+camel+"\n";



    const url = "https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/"+myString+"?tab=configure"
    console.log(url+"\n"+servlss+"\n\n" +firstupdate +"\n\n"+secnd);
    return firstupdate +"\n"+secnd;
    
    
    };


forServerless("rename-exposure");



// const user = process.env.PGUSER;
// const host = process.env.PGHOST;
// const database = process.env.PGDATABASE;
// const password = process.env.PGPASSWORD;
// const port = process.env.PGPORT;