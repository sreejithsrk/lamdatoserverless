const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml')
const directoryPath = "D:\\Users\\Sreejith\\repo\\EigenPrism-lambdas\\serverless"; //path.join(__dirname, '');

const foldername = [];
const serverlessFile = "serverless.yml"
const serverlessFilepath = directoryPath + "\\delete-archive-exposure\\" + serverlessFile;
let folderDetails =fs.readdirSync(directoryPath)
folderDetails=removeElementFromFolder(folderDetails,serverlessFile);
folderDetails=removeElementFromFolder(folderDetails,".serverless");
let functionslist=[]
let k=0;
folderDetails.forEach(folder => {
    if (folder != serverlessFile) {
        fs.readdirSync(directoryPath + "\\" + folder).forEach(file => {
            if (file === serverlessFile) {
                try {
                    const FILE_LOCATION = directoryPath + "\\" + folder + "\\" + file;
                    functionslist.push("${file(./"+folder+"/function.yml)}")
                    const doc = yaml.load(fs.readFileSync(FILE_LOCATION, 'utf8'));
                    const otherfiles=removeElementFromFolder([...folderDetails],folder);
                    let patterns=[]
                    for(i=0;otherfiles.length>i;i++){
                       patterns.push("!"+otherfiles[i]);
                    }
                    console.log(folder)
                   const include =folder.toString()+"/**";
                   patterns = [...patterns,""+include]
                    
                    console.log(JSON.stringify(patterns))
                    doc.functions[folder].handler=folder+"/"+doc.functions[folder].handler;
                    doc.functions[folder]={ package:{patterns : [...patterns]},... doc.functions[folder]};
                    let yamlStr = yaml.dump(doc.functions);
                    fs.writeFileSync(directoryPath + "\\" + folder + "\\" +'function.yml', yamlStr, 'utf8');
                } catch (e) {
                    console.log(e);
                }
            }
        })
    }
    k++;
    if(folderDetails.length==k){
        updateServerlessfile(directoryPath + "\\"+serverlessFile, functionslist) 
    }
});

function removeElementFromFolder(folder,filename){
    const index = folder.indexOf(filename);
    if (index > -1) {
        folder.splice(index, 1);
      }
      return folder;
}
function updateServerlessfile(fileLocation,functionslist){
    const doc = yaml.load(fs.readFileSync(fileLocation, 'utf8'));
    doc.functions =[...functionslist];
    let yamlStr = yaml.dump(doc);
    console.log(fileLocation)
    fs.writeFileSync(fileLocation, yamlStr, 'utf8');

}
