var CLIENT_ID = '14806378689-eaah7ik8tgmc0tg8vkq7';
CLIENT_ID += 'tomaaudotcaf.apps.googleusercontent.com';

var SCOPES = ['https://spreadsheets.google.com/feeds',
              'https://www.googleapis.com/auth/spreadsheets',
              'https://docs.google.com/feeds'];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    console.log("inside checkAuth")
    gapi.auth.authorize(

        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        console.log(authResult);
        loadSheetsApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 * @return {boolean} returns true or false.
 */
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
    var discoveryUrl =
        'https://sheets.googleapis.com/$discovery/rest?version=v4';

    gapi.client.load(discoveryUrl).then(addrow);
}

/**
 * Send batchUpdate request to append a new row in the sheet.
 */
function addrow() {
        addrow.called = true;
        //console.log("test");
        alert_type = document.getElementById('t1').value;
        shifts = document.getElementById('t2').value;
        incoming_queue = document.getElementById('t3').value;
        phone_call = document.getElementById('t4').value;
        action_taken = document.getElementById('t5').value;
        Remarks = document.getElementById('t6').value;
        user_id = document.getElementById('hide').value;
        //console.log(alert_type);
        var now = new Date();
        var timeStamp = (now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':'
                      + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                      .getSeconds()) : (now.getSeconds()));
        var requests = [];
        requests.push({
                'appendCells': {
                    'sheetId': 1562920367,
                    'fields': '*',
                    'rows': [{
                            'values': [{
                                    'userEnteredValue': {
                                        'stringValue': timeStamp
                                    }
                                },{
                                    'userEnteredValue': {
                                      'stringValue': shifts
                                    }
                                },{
                                    'userEnteredValue': {
                                        'stringValue': user_id
                                    }
                                },{
                                    'userEnteredValue': {
                                        'stringValue': gcase_id
                                    }
                                },{
                                    'userEnteredValue': {
                                        'stringValue': date
                                    }
                                },{
                                    'userEnteredValue': {
                                        'stringValue': case_type
                                    }
                                }, {
                                    'userEnteredValue': {
                                        'stringValue': activity_type
                                    }
                                }, {
                                    'userEnteredValue': {
                                        'stringValue': alert_type
                                    }
                                }, {
                                    'userEnteredValue': {
                                        'stringValue': action_case
                                    }
                                }, {
                                    'userEnteredValue': {
                                        'stringValue': case_category
                                    }
                                }, {
                                  'userEnteredValue': {
                                    'stringValue': incoming_queue
                                    }
                                  }, {
                                    'userEnteredValue': {
                                      'stringValue': phone_call
                                    }
                                  }, {
                                    'userEnteredValue': {
                                      'stringValue': action_taken
                                    }
                                  }, {
                                    'userEnteredValue': {
                                      'stringValue': Remarks
                                    }
                                  }
                                ]
                            }
                        ],
                    }
                });

            //var batchUpdateRequest = {"requests":requests}
            //console.log(batchUpdateRequest);

            var response = gapi.client.sheets.spreadsheets.batchUpdate({
                spreadsheetId: '1mGvhJISLvtrLBvqueNBediq6El4H3bHaYfd4IrlTt8w',
                requests: requests
            });

            response.then(function(data) {
                //console.log(data)
            });
            console.log("inside addrows");
            if(addrow.called){
              console.log("check if onloadcomplete_test has run");
            var success_msg = '<b>Form submitted succesfully</b>';
            document.getElementById("popup").style.display = "none";
            document.getElementById("demo").style.display = "none";
            document.getElementById("success_message").innerHTML = success_msg;
            }
        }
        /**
         * Check if window.onload is called for first time.
         * @param {Object} func
         */
        function onloadcomplete_test(func) {
            var oldOnLoad = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = func;
            } else {
                window.onload = function() {
                    oldOnLoad();
                    func();
                };
            }
        }

        onloadcomplete_test(function() {
            //console.log('inside onloadcomplete_test');
            document.getElementById('submit-button').addEventListener('click', checkAuth);
            document.getElementById('authorize-button'
            ).addEventListener('click', handleAuthClick);
            // alert('window loaded');

        });

        function getTimeStamp() {
          console.log("inside getTimeStamp");
           var now = new Date();
           console.log((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':'
                         + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                         .getSeconds()) : (now.getSeconds())));
      }
