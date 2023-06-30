var SNums = [];
var SNames = [];
var SAtt = [];
var SId =[];
var tota = 0;
readRecords("Students", {}, function(records) {
  for (var j =0; j < records.length; j++) {
    appendItem(SId,(records[j]).id);
    appendItem(SNums, (records[j]).Number);
    appendItem(SNames, (records[j]).Name);
    appendItem(SAtt, (records[j]).Attendance);
  }
});
readRecords("Dates", {}, function(records) {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentDate = day+"-"+month+"-"+year;
  for (var i =0; i < records.length; i++) {
    if (records[i].Date == currentDate) {
      tota = records[i].Total;
    }
  }
});
onEvent("textIn", "input", function(e) {
  if (getProperty("textIn", "text").length == 3) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var currentDate = day+"-"+month+"-"+year;
    readRecords("Attendance", {}, function(rec) {
      var arry = [];
      for(var i = 0;i<rec.length;i++){
        if(rec[i].Date == currentDate){
          if(rec[i].Number == getProperty("textIn", "text")){
              appendItem(arry,rec[i].Number);
            }
          
        }
      }
      appendItem(arry,getProperty("textIn", "text") );
      var toMap = [];
      var resultToReturn = false;
      for (var i = 0; i < arry.length; i++) {
      if (toMap[arry[i]]) {
            resultToReturn = true;
            break;
          }
      toMap[arry[i]] = true;
      }
      if (resultToReturn) {
       playSpeech("Sorry the entry number you entered has been already used today", "female", "English");
      }
      else {
          DoThe();
      }
    });
   
  }
});
onEvent("button2", "click", function(Click) {
  var dates = [];
  setScreen("screen2");
  readRecords("Dates", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      appendItem(dates, records[i].Date);
    }
    setProperty("dropdown1", "options", dates);
  });
});
onEvent("button1", "click", function(Click) {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentDate = day+"-"+month+"-"+year;
  createRecord("Dates", {Date:currentDate,Total:0}, function(record) {
    playSound("assets/category_achievements/lighthearted_bonus_objective_1.mp3", false);
  });
  setScreen("screen1");
});
var count = 0;
onEvent("button3", "click", function( ) {
  setScreen("screen3");
  readRecords("Attendance", {}, function(Att) {
    var Atten = [];
    for (var i =0; i < Att.length; i++) {
      if ((Att[i]).Date == getText("dropdown1")) {
       appendItem(Atten, Att[i].Number);
      }
    }
    readRecords("Students", {}, function(stu) {
      for (var i =0; i < stu.length; i++) {
        var pres = false;
        for (var j = 0; j < Atten.length; j++) {
          if (stu[i].Number == Atten[j]) {
            pres = true;
          }
        }
        var st = "";
        if(pres){
          st = "✔";
          count++;
          
        }else{
          st = "❌ ";
        }
        Add_to_textarea(stu[i].Number+"             "+st);
      }
      setProperty("label5", "text", "Total attendance - "+count);
    });
  });
});
function myFunction() {
  for (var i =0; i < records.length; i++) {
    if ((records[i]).Date == getText("dropdown1")) {
      count++;
    }
  }
}
function Add_to_textarea(strCurr) {
 setProperty("text_area2", "text", (getText("text_area2")+strCurr)+"\n");
 strCurr = "";
}
onEvent("button4", "click", function( ) {
  setScreen("Chart");
  drawChartFromRecords("chart1", "line", "Dates", ["Date", "Total"]);
});
onEvent("button5", "click", function( ) {
  setScreen("screen1");
});
function DoThe(){
    console.log("Welcome");
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var currentDate = day+"-"+month+"-"+year;
    var CurrName = "";
    for (var i = 0; i < SNames.length; i++) {
      if (getProperty("textIn", "text") == SNums[i]) {
        CurrName = SNames[i];
      }
    }
    createRecord("Attendance", {Number:getProperty("textIn", "text"),Name:CurrName,Date:currentDate}, function(record) {
      
    });
    var CurrID = 0;
    var ind = 0;
    for (var i = 0; i < SNums.length; i++) {
      if(getProperty("textIn", "text") == SNums[i]){
        CurrID = SId[i];
        ind = i;
        
      }
    }
    var attenda = SAtt[ind];
    attenda++;
    updateRecord("Students", {id:CurrID,Number:SNums[ind],Name:SNames[ind],Attendance:attenda}, function(record, success) {
      console.log(success);
    });
    tota++;
    readRecords("Dates", {}, function(Dat) {
      for (var i = 0; i < Dat.length; i++) {
        if (Dat[i].Date == currentDate) {
          updateRecord("Dates", {id:Dat[i].id,Date:currentDate, Total:tota}, function(record, success) {
            console.log(success);
          });
        }
      }
    });
    setProperty("textIn", "text", "");
    if (getProperty("checkbox2", "checked") == true) {
      playSound("assets/category_bell/vibrant_game_bell_ding.mp3", false);
    }
}
onEvent("button6", "click", function( ) {
	setScreen("screen1");
});
onEvent("button7", "click", function( ) {
	setScreen("screen1");
});
onEvent("button9", "click", function( ) {
	setScreen("screen5");
	readRecords("Students", {}, function(records) {
	   var ar = [];
	   for (var i =0; i < records.length; i++) {
	    ar.push([records[i].id,records[i].Number,records[i].Name,records[i].Attendance]);
   }
   ar = ar.sort(sortFunction);
	   for (var i = 0; i < ar.length; i++) {
	     Add_to_textarea1((ar[i][1]+"           ")+ar[i][3]);
	   }
	});
});
function Add_to_textarea1(strCurr) {
setProperty("text_area1", "text", (getText("text_area1")+strCurr)+"\n");
strCurr = "";
}
function sortFunction(a, b) {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] > b[3]) ? -1 : 1;
    }
}
onEvent("button10", "click", function( ) {
	setScreen("screen1");
});
