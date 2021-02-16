const router = require('express').Router();
const pdf = require('pdf-parse');
const keyword_extractor = require("keyword-extractor");
const upload = require("../../config/multerConfig")

router.post('/',upload.single("file"),(req,res)=>{
console.log(req.file);
  pdf(req.file.buffer).then(function(data) {

      var extraction_result = keyword_extractor.extract(data.text,{language:"english", remove_digits: true, return_changed_case:true, remove_duplicates: true});
      console.log(extraction_result);
      let stackKeyword=['wordpress','lb','vpc','private','autoscaling','elb','apache-php','mysql']
      let apacheKeyword=['httpd','lb','apache','autoscaling','elb','cpu','alaram']
      let nodejsKeyword=['nodejs','github']
      
      let result=[]
      let commonArray=[]
      let percentage
      extraction_result.forEach( x => {
        if(stackKeyword.indexOf(x) != -1){
          commonArray.push(x);
        }
      })
      percentage=commonArray.length/stackKeyword.length
      commonArray.length?((commonArray.length/stackKeyword.length<2)?(result.push({'stack':'wordpress','percentage':percentage,'keyword':commonArray})):null):null
      console.log(result);
      commonArray=[]
      extraction_result.forEach( x => {
        if(apacheKeyword.indexOf(x) != -1){
          commonArray.push(x);
        }
      })
      percentage=commonArray.length/stackKeyword.length
      commonArray.length?(((commonArray.length/apacheKeyword.length)<2)?(result.push({'stack':'apache','percentage':percentage,'keyword':commonArray})):null):null
      commonArray=[]
      extraction_result.forEach( x => {
        if(nodejsKeyword.indexOf(x) != -1){
          commonArray.push(x);
        }
      })
      percentage=commonArray.length/stackKeyword.length
      commonArray.length?((commonArray.length/nodejsKeyword.length<2)?(result.push({'stack':'nodejs','percentage':percentage,'keyword':commonArray})):null):null

      res.status(200).send(result)
  });
})

module.exports=router
