
var date = '';
var gcase_id = '';
var case_type = '';
var activity_type = '';
var alert_type = '';
var action_case = '';
var case_category = '';
var user_id;
// function getUser(callback){
//       chrome.identity.getProfileUserInfo(function(userInfo){
//       var userId = userInfo.id;
//       // This will call the function that you pass in below
//       //and pass in userInfo.if as a parameter
//       callback(userId);
//     });
// }

// var user_id = getUser(function (email){
//   email = userId;
//   return email;
// });
// console.log(user_id);

function getGaia(callback){
var useremail = '';
chrome.identity.getProfileUserInfo(function(userInfo) {
 /* Use userInfo.email, or better (for privacy) userInfo.id
    They will be empty if user is not signed in in Chrome */
    callback(userInfo.email);
});
}

function callback(useremail){
console.log('in callback');
console.log(useremail);
var user_id = useremail;
document.getElementById('email').innerHTML = user_id;
document.getElementById('hide').value = user_id;
console.log(document.getElementById('hide').value);
}


chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == 'getSource') {
    //message.innerText = request.source;
    getGaia(callback);

    console.log(document.getElementById('hide').value);

    var cell_values = String(request.source);
    var cell_values_array = cell_values.split(',');
    //console.log(cell_values_array);
    // user_id = cell_values_array[0]
    date = cell_values_array[0];
    gcase_id = cell_values_array[1];
    case_type = cell_values_array[2];
    activity_type = cell_values_array[3];
    action_case = cell_values_array[4];
    case_category = cell_values_array[5];

    console.log("calling callback");
    // user_id = getGaia();

    console.log("after call");
    var tat = '<div id="demo"><table><tr><th>Property</th><th>Value</th></tr><tr><td><b>User Id</b></td><td id = "email">';
    tat +=  '</td></tr><tr><td><b>Case Stamp<b></td><td>';
    tat += date + '</td></tr><tr><td><b>Case Id</b></td><td>';
    tat += gcase_id + '</td></tr><tr><td><b>Gtech Case Type</b></td><td>';
    tat += case_type + '</td></tr><tr><td><b>Channel Type</b></td><td>';
    //tat += activity_type + '</td></tr><tr><th>Alert Type:</th><td>';
    //tat += alert_type + '</td></tr><tr><th>Action case:</th><td>';
    tat += activity_type + '</td></tr><tr><td><b>Internal Route</b></td><td>';
    tat += action_case + '</td></tr><tr><td><b>Case catergory</b></td><td>';
    tat += case_category + '</td></tr></table><div>';
//    tat += '<form>';
//    tat += '<b>Incoming alert type</b>';
//    tat += '<br>'
//    tat += '<input id="t1" placeholder= "enter incoming alert type" type="text">';
//    tat += '<input id="button" type = "button" value="submit">';
//    tat += '</form>';
    document.getElementById('demo').innerHTML = tat;
    }
});


console.log('inside writeSheet');

window.addEventListener('DOMContentLoaded', function onWindowLoad() {

  var message = document.querySelector('#message');

    //var a=document.getElementbyId('t1').value;
    console.log('inside add listener');
    //console.log(a);

  chrome.tabs.executeScript(null, {
    file: 'getPageSource.js'
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP
    // you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n';
      //message.innerText += chrome.runtime.lastError.message;
    }
  });

  // sheets api starts here

}, false);

