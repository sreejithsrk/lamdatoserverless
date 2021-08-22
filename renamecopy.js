const path = require('path');
const fs = require('fs');
const directoryPath = "D:\\Users\\Sreejith\\repo\\EigenPrism-lambdas\\serverless"; //path.join(__dirname, '');

console.log(directoryPath);
const foldername=[];
const serverlessFile="serverless.yml"
const  serverlessFilepath =directoryPath+"\\delete-archive-exposure\\"+serverlessFile;
fs.readdirSync(directoryPath).forEach(folder => {
  fs.readdirSync(directoryPath+"\\"+folder).forEach(file=>{
    if(file === "index.js"){
      const oldPath=directoryPath+"\\"+folder+"\\"+file;
      const newPath=directoryPath+"\\"+folder+"\\handler.js";
      const newServerless =directoryPath+"\\"+folder+"\\"+serverlessFile;
      renameFile(oldPath,newPath);
      copyFile(serverlessFilepath,newServerless);
      foldername.push(folder);
    }
  })
 
});

function renameFile(folderpath,newpath){
  fs.rename(folderpath, newpath, function (err) {
    if (err) throw err;
    console.log('File Renamed.');
  });
}

function copyFile(source,destination){
  // File destination.txt will be created or overwritten by default.
fs.copyFile(source, destination, (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
});
}
