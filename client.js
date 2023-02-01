let count=0,ans=[];

const codechef=(info,len)=>{
      
    let ajax=new XMLHttpRequest();

     ajax.onload=()=>{
         
         count++;
         let data=new DOMParser().parseFromString(ajax.responseText,"text/html");
         let currRat=data.getElementsByClassName("rating-number")[0].textContent;
         let star=(data.getElementsByClassName("rating-star")[0].childNodes.length);
         let str=(data.getElementsByClassName("rating-star")[0].nextElementSibling.nextElementSibling.textContent.slice(16));
         let max=str.substring(0,str.length-1);
          
         let val=data.getElementsByTagName("h5")[0].textContent;

         let solved=(val.substring(14,val.length-1));


         ans.push({"name":info.name,"id":info.id,"star":star,"currentRating":currRat,"maxRating":max,"problemsSolved":solved});
         console.log(ans[ans.length-1]);

         if(count>=len){
         document.getElementsByTagName("a")[0].href="json?arr="+JSON.stringify(ans);
         document.getElementsByTagName("a")[0].style.display="block";
         }

     }

     ajax.open("GET","/codechef?name="+info.id);
     ajax.send();

}


function excelFileToJSON(){
   
    var file=document.getElementById("input").files[0];

    try {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function(e) {
 
          var data = e.target.result;
          var workbook = XLSX.read(data, {
              type : 'binary'
          });
          var result = {};
          workbook.SheetNames.forEach(function(sheetName) {
              var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              if (roa.length > 0) {
                  result[sheetName] = roa;
              }
          });

          
          
                
          for(let key in result){

            for(let json of result[key]){
                
                console.log(result[key].length);
                codechef(json,result[key].length);
            }

            break;
        }

          }
      }catch(e){
          console.error(e);
      }
}