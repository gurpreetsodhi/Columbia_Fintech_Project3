$(document).on("ready", function()
{

    localStorage.removeItem("token_co2_userObj");
    
	
	
	
	
	//SET CONTRACT
	let contractObj = 
	{
		Companies: ["Tesla", "Mercedes", "Ford", "Honda", "Volkswagon"],
		sellers: []
		
	}
	
	let contractObjSet = localStorage.getItem("contractObj");
	if(contractObjSet == "" || contractObjSet == null || contractObjSet == "null")
	{
		
		localStorage.setItem('contractObj', JSON.stringify(contractObj))
	
	}
	
	
	
	
	
	
	
	
	
	//SET TEST ACCOUNTS
    const test_accounts =
    {
        UST: 
        {
            "name": "US Treasury",
            "pb": "0xb0E440c67599faaE8a3C9C7CD79A7e1666594898",
            "pk": "9d9b3788f91f2e3b0771e23ee01a71a8cdd190774162feea27606b80a173da2c",
            "type": "gov",
            "pass": "password123",
            "logo": "treasury",
			"tokens": 0,
			"allocated": 0

        },
        Tesla: 
        {
            "name": "Tesla",
            "pb": "0x7afb7bF74E9907c27a2A7eBE6ecfB5D927109805",
            "pk": "f5ef297795971d60e1ddaa8d011ad694a27913d10bca308fb778e0190806db61",
            "type": "company",
            "pass": "password123",
            "logo": "tesla",
            "percent": 10,
			"tokens": 0,
			"forSale": 0,
			"price": 0

        },
        Mercedes: 
        {
            "name": "Mercedes",
            "pb": "0x6159088c0a2852B5e94C95802918E1cb0874a448",
            "pk": "4b5011f08cba5d34ac4108def05efc1a9580c11de62e1fbf4bb0119a5444ea6b",
            "type": "company",
            "pass": "password123",
            "logo": "mercedes",
            "percent": 20,
			"tokens": 0,
			"forSale": 0,
			"price": 0

        },
        Ford: 
        {
            "name": "Ford",
            "pb": "0x6F60A40C5Ca0556CB01B1011F0f931De1DD2Dc27",
            "pk": "c4f9937c0cd026242b45694d4796f890f31ece3d0e814a45e362a77d9de49fa4",
            "type": "company",
            "pass": "password123",
            "logo": "ford",
            "percent": 30,
			"tokens": 0,
			"forSale": 0,
			"price": 0

        },
        Honda: 
        {
            "name": "Honda",
            "pb": "0xe8f0ac709052dA0c6048a64878193b4890e8007E",
            "pk": "0792aada1b0376dae99579aec2aab6107bf9814e2bde9a068686093fdc437648",
            "type": "company",
            "pass": "password123",
            "logo": "honda",
            "percent": 30,
			"tokens": 0,
			"forSale": 0,
			"price": 0

        },
        Volkswagon: 
        {
            "name": "Volkswagon",
            "pb": "0xC6ef9357f4DA7b4716861c8E1dDD4885d81bF697",
            "pk": "8900e13efc3823d1fa26bbfa692960a715823b332ccfc0169435f5f865802570",
            "type": "company",
            "pass": "password123",
            "logo": "vw",
            "percent": 10,
			"tokens": 0,
			"forSale": 0,
			"price": 0

        },
       
    };

	let test_accountsObj = localStorage.getItem("accountsObj");
	if(test_accountsObj == "" || test_accountsObj == null || test_accountsObj == "null")
	{
		localStorage.setItem('accountsObj', JSON.stringify(test_accounts));
	}
	
	
    //COMPANY LOGIN
    $(document).on("click", ".login-comp",function()
    {
        let entity = $("#select-comp-account").val();
        setEntityLogin(entity, "company");
    });
    //GOV LOGIN
    $(document).on("click", ".login-ust",function()
    {
        let entity = "UST";
        setEntityLogin(entity, test_accounts[entity].type);
    });


    //LOG ENTITY IN
    function setEntityLogin(entity, type)
    {
        let userObj = {entity: entity, pb: test_accounts[entity].pb,  pk: test_accounts[entity].pk, type: test_accounts[entity].type, logo: test_accounts[entity].logo}
        localStorage.setItem('token_co2_userObj', JSON.stringify(userObj));
        
        let userObjAfter = localStorage.getItem('token_co2_userObj');
        loadWindow("Dash", test_accounts[entity].type).then(function(r)
        {

            $(".wrap").append(r);


        });
       

    }


    welcome();
    var showRoomIconBlinker;
    var delay = 100;
    var clickDelay = 0;
    var scrollTime;
    var hsImgChangeTimer;
    var currentlySpeakingTo = "Bot";
    var convoRefreshInteral;

    //CUSTOMER VARIABLES
    var customerID = localStorage.getItem("customerID");
    var customerSession = localStorage.getItem("customerSession");
    var chatID = localStorage.getItem("chatID");
    var customerEmail = localStorage.getItem("customerEmail");

    var setTimeoutDelay = 0;
    var blinkElementsTimer;
    
    var trialToPrompt = 0




    //ELEMENTS
    const nav = "<div class='nav'><div class='navLeft'><nav><button class='hoverImage navOneButtons' data-value='Welcome'>Welcome</button><button class='hoverImage navOneButtons' data-value='Dash'>Dash</button><button class='hoverImage navOneButtons' data-value='Buy'>Buy</button><button class='hoverImage navOneButtons' data-value='Sell'>Sell</button><div class='nav-top-myBase'><div class='nav-top-myBase-left'></div><div class='nav-top-myBase-right myProfilePic' data-value='MyBase'><img class='trpp hoverImage' src='assets/defaultpic.png' style='border-radius: 50%;'></div></div></div><div class='navRight'><img src='assets/events-dropdown.png' class='showNav'></nav></div></div>";










    //CLICKS

   
    

    $(document).on("click", ".editContract, .showBuyForm, .showSellForm",function()
    {

        $(".right-side-form").fadeIn("fast"); 
    });
    
    
    
    
    $(document).on("click", ".close-control",function()
    {
        let id = $(this).attr("data-id");
        $("#"+id).remove();
    });

    





    $(document).on("change", ".available-companies", function()
    {
        let value = $(this).val();
        if(value == "Add All Companies")
        {
            $(".selected-companies").empty();
        }
        else
        {
            $(this).val("Select");
            if($("#"+value).length > 0)
            {
                $("#"+value).fadeTo( "fast", 0.33 ).fadeTo("fast", 1).fadeTo( "fast", 0.33 ).fadeTo("fast", 1).fadeTo("fast", 1).fadeTo( "fast", 0.33 ).fadeTo("fast", 1);
                return;
            }
            

            let time = Date.now();
            let classString = time + value;
            $(".selected-companies").append("<button id='"+value+"' class='"+classString+"'>"+value+" <span style='color: red;'>X</span></button>");
            $("."+classString).on("click", function()
            {
                $(this).remove();
            });
        }
        
    });

    $(document).on("click", ".nvm", function()
    {
        let window = $(this).attr("data-windowtoclose");
        $("."+window).remove();
    });

    $(document).on("click", ".wrap-bot", function()
    {

        $(this).css("display", "none");
        loadBotWindow().then(function(r)
        {

            $(".wrap").append(r);

        });

    });
 
    
    //END SUB
    $(document).on("click", ".end-sub", function()
    {
        
        let time = Date.now();
        let id = $(this).attr("data-id");
        let pi = $(this).attr("data-pi");
        getPromptCancel(time, id, pi);
        
    });


    //CLOSE PROMPT BY CLICKING DO NOTHIG
    $(document).on("click", ".prompt-do-nothing, .dcs", function()
    {

        $(".promptWrap").remove();

    });

    //CREATE NEW CUST ACCOUNT
    $(document).on("click", "#button-customerlogin-submitlogin", function()
    {
        if(clickDelay == 0)
        {
            clickDelay = 1

            let email = $("#input-login-email").val();
            let password = $("#input-login-password").val();

            logCustomerIn().then(function(r)
            {
                clickDelay = 0;

                if(r == "cdne")
                {
                    $(".customerLoginRespDiv").append("Customer not found");
                    return;
                }
                if(r == "Incorrect Login")
                {
                    $(".customerLoginRespDiv").append("Incorrect Login");
                    return;
                }
                if(r == "error")
                {
                    $(".customerLoginRespDiv").append("Error Occured");
                    return;
                }
                
                
                let customer = JSON.parse(r);
                setCustomer(customer);
                $(".closeMainLoginForm").trigger("click");
                loadCustomersBase();

            });


        }
    });


    

    //CREATE NEW CUST ACCOUNT
    $(document).on("click", "#button-customerlogin-createaccount", function()
    {
        if(clickDelay == 0)
        {
            clickDelay = 1


            let name = $("#input-signup-name").val();
            let email = $("#input-signup-email").val();
            let password = $("#input-signup-password").val();

            createcustomer(name, email, password).then(function(r)
            {

                clickDelay = 0;

                $(".customerLoginRespDiv").empty();
                $(".customerLoginRespDiv").append(r);

                let customer = JSON.parse(r);
                setCustomer(customer);


                $(".closeMainLoginForm").trigger("click");
                loadCustomersBase();

        

            });
        }
    });



    //KEY UPS LOGIN FORM
    $(document).on("keyup", "#input-login-email", function()
    {
        let value = $(this).val();
        if(value !=="")
        {
            $("#input-login-email-p").fadeTo("fast", 1);
        }
        else
        {
            $("#input-login-email-p").fadeTo("fast", 0);
        }
    });
    $(document).on("keyup", "#input-login-password", function()
    {
        let value = $(this).val();
        if(value !=="")
        {
            $("#input-login-pass-p").fadeTo("fast", 1);
        }
        else
        {
            $("#input-login-pass-p").fadeTo("fast", 0);
        }
    });
    //KEY UPS SIGNUP FORM
    $(document).on("keyup", "#input-signup-name", function()
    {
        let value = $(this).val();
        if(value !=="")
        {
            $("#input-signup-name-p").fadeTo("fast", 1);
        }
        else
        {
            $("#input-signup-name-p").fadeTo("fast", 0);
        }
    });
    $(document).on("keyup", "#input-signup-email", function()
    {
        let value = $(this).val();
        if(value !=="")
        {
            $("#input-signup-email-p").fadeTo("fast", 1);
        }
        else
        {
            $("#input-signup-email-p").fadeTo("fast", 0);
        }
    });
    $(document).on("keyup", "#input-signup-password", function()
    {
        let value = $(this).val();
        if(value !=="")
        {
            $("#input-signup-pass-p").fadeTo("fast", 1);
        }
        else
        {
            $("#input-signup-pass-p").fadeTo("fast", 0);
        }
    });


    





    //TOGGLE SIGNUP FORM
    $(document).on("click", "#button-customerlogin-toggle-newAccount", function()
    {
        $(".customerLoginRespDiv").empty();
        getLoginFormInputs().then(function(inputsObj)
        {
            $(".customerMainLogin-inputs").fadeTo("fast", 0);
            $(".customerMainLogin-buttons").fadeTo("fast", 0);
            setTimeout(function()
            {
                $(".customerMainLogin-inputs").empty();
                $(".customerMainLogin-buttons").empty();
                $(".customerMainLogin-heading").html("Create New Account");

                $(".customerMainLogin-inputs").append(inputsObj.signUp.Inputs);
                $(".customerMainLogin-buttons").append(inputsObj.signUp.Buttons);
                $(".customerMainLogin-inputs").fadeTo("fast",1);
                $(".customerMainLogin-buttons").fadeTo("fast",1);
            
            }, 500);
        });
    });
   


    //TOGGLE SIGNUP FORM
    $(document).on("click", "#button-customerlogin-toggle-signin", function()
    {
        $(".customerLoginRespDiv").empty();
        getLoginFormInputs().then(function(inputsObj)
        {
            $(".customerMainLogin-inputs").fadeTo("fast", 0);
            $(".customerMainLogin-buttons").fadeTo("fast", 0);
            setTimeout(function()
            {
                $(".customerMainLogin-inputs").empty();
                $(".customerMainLogin-buttons").empty();
                $(".customerMainLogin-heading").html("Please Login To Access Your Account");

                $(".customerMainLogin-inputs").append(inputsObj.login.Inputs);
                $(".customerMainLogin-buttons").append(inputsObj.login.Buttons);
                $(".customerMainLogin-inputs").fadeTo("fast",1);
                $(".customerMainLogin-buttons").fadeTo("fast",1);
            
            }, 500);
        });
   

    });









    //TRY IT OUT - LIVE CHAT
    $(document).on("click", ".bs-livechat-tryItOut", function()
    {

        trialToPrompt = "livechat";

        verifyCustomer().then(function(r)
        {

            if(r == "cdne")
            {
                destroyCustomer();
                let heading = "Please Login To Access Your Account";
                $(".closeMainLoginForm").trigger("click");
                loadCustomerMainLogin(heading);
              
            }else
            {
             


                loadCustomersBase();


            }
    


        });
    

    });











  //BODY CLICKS
  $(document).on("click", function(e)
  {

    if($(".helpMessages").is(":visible"))
    {
        $("#closeHelpMessages").trigger("click");
    }
  });
  $(document).on("mousedown", ".heading", function()
  {
    $(".eachFolder").css("z-index", "1");
    $(".eachFolderRel").css("opacity", "1");
    $(".eachFolder").css("margin-left", "2%");
    $(".eachFolder").removeClass("eachFolderWithShadow");
  });




    
    //CANCEL CONTRACT FOLDER SEARCH
    $(document).on("click", ".cancelFolderSearch", function()
    {
        $(".searchForFolder").val("");
        $(this).slideUp(100);
    });
    $(document).on("keyup", ".searchForFolder", function()
    {
        let value = $(this).val();
        if(value=="")
        {
            $(".cancelFolderSearch").slideUp(100);
        }
        else
        {
            $(".cancelFolderSearch").slideDown(100);
        }
    });

    
    //LOAD CONTRACT FOLDERS
    $(document).on("click", ".contractFolders", function()
    {

        loadProjectFolders();


    });



    //SEND BUTTON KEYUP
    $(document).on("keyup", "#liveChatTA", function(){
        var value = $(this).val();
        if(value !==""){
            $("#sendLiveChatMess").css("opacity", 1);
        }else{
            $("#sendLiveChatMess").css("opacity", .3);
        }
      });
    

   //SEND 
   $(document).on("click", "#sendLiveChatMess", function()
   {
       var value = $("#liveChatTA").val();
       $("#liveChatTA").val("");

       if(value !==""){
           $("#sendLiveChatMess").css("opacity", 1);
       }else{
           $("#sendLiveChatMess").css("opacity", .3);
           return;
       }


       sendMessage(value).then(function(r){
           if(r == "error")
           {
               clickDelay = 0
               return;
           }

           let data = JSON.parse(r);
           constructChatMessage(data, "after");
           clickDelay = 0;
           $("#liveChatTA").val("");

       });
   });




    //GET STARTED WITH PACKAGE
    $(document).on("click", ".getStartedPackage", function()
    {

        let package = $(this).attr("id");
        let projectFor = $(this).attr("data-projectfor");
        getStartedPackage(package, projectFor);


    });
  
    //CLOSE HELP MESSAGES
    $(document).on("click", "#closeHelpMessages",function()
    {

        baseBot.closeHelpMessages();


    });


    // CONFIRM CREATE
   var servicesArray = new Array();
   $(document).on("click", "#confirmCreateCustContract", function()
    { 

      if(clickDelay == 0)
      {
        servicesArray = [];
  
        //clickDelay = 1;
        let time = $(this).attr("data-time");
        let edit = $(this).attr("data-edit");
        let customerID = $(this).attr("data-customerid");
        let name = $(this).attr("data-name");
        let email = $(this).attr("data-email");
        let projectTitle = $(".projectTitle").val();
        let projectFor = $("#contract-newOrExisting").val();
        let deliveryDate = $("#newCustCont-deliveryDate").val();
        let totalPrice = $("#contractTotalPriceSoFar").html();
        totalPrice = totalPrice.replace("$", "");
        let additionalInfo = $("#additionalContractDetails").val();
        let existingContractID = $(this).attr("data-existingcontractid");
        let additionalPages = $("#itemPageCounter-AdditionalPages").val();
        if(additionalPages == "undefined" || additionalPages == undefined)
        {
            additionalPages = 0;
        }
        let packageID = $(this).attr("data-packageid");
        let packageName = $(this).attr("data-packagename");
        let totalPagesIncludes = $(this).attr("data-totalpagesincludes");
        let templateID = $(this).attr("data-templateid");
        let existingFolderID = $(this).attr("data-existingfolderid");
        if(existingFolderID !== "none")
        {
            projectTitle = $(".existingFolderNames-title").html();
        }
        


      
        let selectedServices = document.getElementsByClassName("eachSelectedContractItem");
    
        for(var i = 0; i<selectedServices.length; i++)
        {
          
          var serviceEl = selectedServices[i];
          var thisID = $(serviceEl).attr("id");
          var thisPrice = $(serviceEl).attr("data-price");
          var thisDetails = $(serviceEl).attr("data-details");
          var totalPages = $("#itemPageCounter-"+thisID).val();
          if(thisID == "LiveChat" || thisID == "Database" || thisID == "ContactForm" || thisID == "EmailServer")
          {
           totalPages = 1;
          }
  
          var arr = new Array(thisID, thisPrice, thisDetails, totalPages);
          servicesArray.push(arr);
          
        }
        
      
  
        //MAKE SURE EVERYTHING FILLED OUT

        //CHECK PROJECT FOLDER
        if(projectTitle == "")
        {
            if($(this).attr("data-existingfolderid") == "none")
            {
                $(".errorDiv").html("Please Enter New Folder Name or Selecting Existing<br><br>");
                setTimeout(function()
                {
                    $(".errorDiv").html("");
                }, 3500);
                clickDelay = 0;
                return;
            }

        }


        //CHECK OTHER INPUTS
        if(projectFor == "Select One" || deliveryDate == "" || additionalInfo == "" || selectedServices.lenght == 0)
        {
            $(".errorDiv").html("Enter All Fields<br><br>");
            setTimeout(function()
            {
                $(".errorDiv").html("");
            }, 3500);
            clickDelay = 0;
  
        }else
        {

            
          
  
          handleContract(customerID, name, email, "newContract", servicesArray, projectFor, currentTotalPages, deliveryDate, totalPrice, additionalInfo, existingContractID, edit, packageID, packageName, totalPagesIncludes, additionalPages, templateID, projectTitle, existingFolderID).then(function(r)
          {
           
      
  
            if(r == "error")
            {
              alert("error occured");
            }
            else
            {
              let contract = JSON.parse(r);
                
              $(".eachCustomerContract"+contract.id).remove();
              $(".contractWrap").remove();
           
              let containerToAppend = document.getElementById("mycontracts-scroll-wrap"+time);
     
              let preOrAp = "pre";
              constructEachCustCont(contract, containerToAppend, preOrAp);
  
  
            }
  
        });
      
        }
      }
    });






    //LOAD PREVIEW
    $(document).on("click", ".seeTemplatePreview",function()
    {
        
        showNewTabAlert();

        let link = $(this).attr("data-link");
        window.open(link, '_blank').focus();

    });

    $(document).on("click", ".navOneButtons, .navTwoButtons, .LiveChatImg, .myProfilePic", function()
    {
    
        $(".wrap-window").remove();

        let value = $(this).attr("data-value");
        hideNavMobile();

        if(value == "Welcome")
        {   
            location.reload(true);
            return;
        }
     
        
        let userObj = localStorage.getItem("token_co2_userObj");
        userObj = JSON.parse(userObj);
        let type = userObj.type;


        

        
        
        loadWindow(value, type).then(function(r)
        {

            $(".wrap").append(r);


        });


     
        
    });


    $(document).on("click", ".showNav",function(){
    $(this).css("display", "none");
   

    $("#navMobile").animate({
        marginLeft: "0%"
    }, 500);
        
    });





    function loadWindow(value, type)
    {

        //if(value == "Dash")
        //{
            //if(type == "company")
            //{
                //value = "Dashcompany";
            //}
        //}

      
    

        return new Promise(function (resolve,reject) 
        { 
            $.ajax({
            url: "../TokenCO2/"+value+".php",
            method: "POST",
            success: function(response)
            {
                resolve(response);
            }
            });
        });
    }

    function loadBotWindow()
    {
        return new Promise(function (resolve,reject) 
        { 
            $.ajax({
            url: "../TokenCO2/bot.php",
            method: "POST",
            success: function(response)
            {
                resolve(response);
            }
            });
        });
    }





    //FADEHOMESCREENOUT
    function  fadeThisHomeScreenOut(thisImage)
    {
 

        $(thisImage).fadeOut(3000);
        setTimeout(function(){
            $(thisImage).remove();
        }, 3000);


    }



    //TOTAL MESSAGES LOADED
    function getTotalConvoLoaded(container)
    {
    totalConvoLoaded = container.children.length;
    return totalConvoLoaded;
    }	



    //GET OLDER MESSAGES
    function getOlderMessages(customerID, chatID, newStart)
    {

        return new Promise(function (resolve,reject) { 
        $.ajax({
        url: "../formhandlers/getoldermessages.php",
        method: "POST",
        data: {
        getChatMessages: 1,
        chatID: chatID,
        customerID: customerID,
        start: newStart
        },
        success: function(response){
        resolve(response);
        }
        });
        });

    

    }












    //RANDOMIZE ARRAY
    function shuffleArray(array) 
    {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

          return array;

    }





    //VERIFY CUSTOMER
    function verifyCustomer()
    {
        
        let customerID = localStorage.getItem("customerID");
        let customerEmail = localStorage.getItem("customerEmail");
        let customerSession = localStorage.getItem("customerSession");

  

       return new Promise(function (resolve,reject) { 
        $.ajax({
        url: "../verifycustomer.php",
        method: "POST",
        data: {
        verifyCustomer: 1,
        customerID: customerID,
        customerEmail: customerEmail,
        customerSession: customerSession
        },
        success: function(response){
        resolve(response);
        }
        });
        });


    }



    //SET CUSTOMER
    function setCustomer(customer)
    {
 

        localStorage.setItem('customerID', customer.customerID);
        localStorage.setItem('customerName', customer.customerName);
        localStorage.setItem('customerSession', customer.customerSession);
        localStorage.setItem('customerEmail', customer.email);

    
    }



    //GET CUSTOMER
    function getCustomerSession()
    {
        return localStorage.getItem("customerSession");
    }
    function getCustomerID(){
    return localStorage.getItem("customerID");
    }
    function getCustomerEmail(){
        return localStorage.getItem("customerEmail");
    }
    function getCustomerName(){
        return localStorage.getItem("customerName");
    }
    //GET CHAT ID
    function getChatID()
    {
         return localStorage.getItem("chatID");
    }




  


    //BLINK DOTDOT
    var blinkDotsInterval;
    function blinkDots()
    {
        blinkDotsInterval = setInterval(function()
        {
            $(".dotdotdot").fadeTo("fast", .3).fadeTo("fast", 1);
        }, 1000);
    }
    




    //DESTROY CUSTOMER
    function destroyCustomer()
    {
        localStorage.removeItem("customerID");
        localStorage.removeItem("customerName");
        localStorage.removeItem("chatID");
        localStorage.removeItem("customerChatID");
        localStorage.removeItem("customerSession");
        localStorage.removeItem("customerEmail");
        $(".livechatWrap").remove();
    }




    //WELCOME SCREEN
    function welcome()
    {
        var time = Date.now();
        let Display = "initial";
        let klass = "homePage";
        var container = getContainer(time, Display, klass);
        $(".wrap").append(container);
    
        let heading = "BaseSolutions";
        let subHeading = "";
        let headingContainer = getHeading(time, heading, subHeading);
    
        $("#containerRelativePos"+time).append(headingContainer);
        $("#backIcon"+time).remove();
        loadWelcome().then(function(r)
        {
            $(".wrap").append(r);
        });
        $(".wrap").append("<div class='wrap-bot hoverImage'><img src='assets/2506659.png'></div>");

    

    
    }






    //CONSTRUCT MENU ICONS
    function constructMenu()
    {

        $("#wrap").append("<div class='navMobile' id='navMobile'><div class='navMobileRelative'><div class='navTwoButtonsContainter'><nav class='mobile-nav'><img class='trpp hoverImage navTwoButtons' data-value='Welcome' src='assets/defaultpic.png' style='border-radius: 50%; width: 40px;'><button class='hoverImage navTwoButtons' data-value='Welcome'>Welcome</button><br><button class='hoverImage navTwoButtons' data-value='Dash'>Dash</button><br><button class='hoverImage navTwoButtons' data-value='Buy'>Buy</button><br><button class='hoverImage navTwoButtons' data-value='Sell'>Sell</button><br></nav></div></div></div>");
        $(".navTwoButtons").css("display", "initial");
        $("#wrap").append(nav);
    
    }
    constructMenu();


    



  




    



    












    //ANIMATION
    $(".logo").fadeIn(2000);
    setTimeout(function(){
    $(".welcomeTextContainer").animate({
        marginLeft: "0px"
    }, 500);
    $(".welcome-number").fadeIn(2000);
    },100);

    setTimeout(function(){
    $(".continueToTemplates").fadeIn(2000);
    },200);




    //BLINKERS
    showRoomIconBlinker = setInterval(function()
    {
    

       if($(".backIcon").is(":visible"))
       {
        $(".backIcon").fadeTo("slow", .3).fadeTo("slow", 1);
       }
   
 
    },2000);






    
    //LOAD WELCOME
    function loadWelcome()
    {
        return new Promise(function (resolve,reject) 
        { 
          $.ajax({
          url: "../TokenCO2/welcome.php",
          method: "GET",
          success: function(response)
          {
            resolve(response);
          }
          });
        });
    }






    //SHOW ERROR
    function showError(message, errorContainer)
    {
        $(errorContainer).empty();
        $(errorContainer).append(message);
    
        setTimeout(function(){
            $(errorContainer).empty();
        },4000);
    
    }
    
















    //CONSTUCT TEAMS
    function constructTeamMember(member)
    {

      

            $(".teamWrap").append("<div class='eachTeamMem'><div class='eachTeamMem-pic'><img src='assets/teamphotos/"+member.pic+"'></div><div class='eachTeamMem-bio'><span class='bio'>"+member.name+"</span><span class='eachTeamMem-Position'><br>"+member.position+"</span><br><span class='bio'>"+member.bio+"</span></div></div>");
    
   

    }
    



    //LOAD APPLICATIONS WINDOW
    function loadApplications()
    {
        var time = Date.now();
        let Display = "initial";
        let overflow = "hidden";
        let klass = "contactWrap";
        let container = getContainer(time, Display, klass);
        let currentApps = "livechat";
        $(".wrap").append(container);
        $("#containerRelativePos"+time).css("background-color", "transparent");
        $("#containerRelativePos"+time).css("overflow", overflow);



        //APPLICATIONS SLIDE IN
        $("#containerRelativePos"+time).append("<div class='applicationsWrap'><div class='applicationsWrap-rel'><div class='applicationsWrap-topBar'><p class='application-heading applications-heading-rainbow'>apps</p></div><div class='applicationsScroller'><div class='applicationsScroller-rel'> </div></div></div></div>");
    
        
        getApps(currentApps).then(function(r)
        {

            $(".applicationsScroller-rel").append(r);
            //LOAD LIVECHAT
            loadLiveChat(1, "customer").then(function(r)
            {
                $(".applicationsInfo-application").append(r);
                setTimeout(function(){
                $(".bs-absolute-wrap").fadeIn();
                }, 1000);

                $(".bs-livechat-position-1").css("left", "60%");
                

            });
            setTimeout(function(){
            loadLiveChat(2, "admin").then(function(r)
            {
                
         
                $(".applicationsInfo-application").append(r);

               
          
                
                setTimeout(function(){
                    $(".applicationsInfo-application").animate({"margin-left":"0px"}, "slow");
                    $(".bs-livechat-screen-logo2").fadeIn("slow");
                    setTimeout(function(){
                        $(".bs-livechat-tryItOut").fadeIn("slow");
                    }, 1500);
                }, 2000);


            });
            }, 100);
          
            
            function loadLiveChat(position)
            {
                return new Promise(function (resolve,reject) 
                { 
                    $.ajax({
                    url: "../../../applications/livechat_demo/livechat.php",
                    method: "POST",
                    data: 
                    {
                        loadEvent: 1,
                        position: position,
                        dateTime: position
                    },
                    success: function(response)
                    {
                        clickDelay = 0;
                        resolve(response);
                    }
                    });
           
                });   

            }





        });









        $(".applicationsWrap").animate({"left":"0px"}, "slow");
        setTimeout(function()
        {
    
        },500);
        
 
    }












    //LOAD CUSTOMER CONTRACT
    function customerLoadContractForm(container, time, edit, packageObj, packageID, template)
    {
        

        $(container).append("<div class='contractWrap' id='contractWrap"+time+"'><div class='contractWrap-relative' id='contractWrap-relative'></div></div>");

        //GET THE FORM
        getContractForm(time, edit, packageObj, packageID).then(function(r)
        {

            $("#contractWrap-relative").append(r);
            $(".newCustNoteWrap").css("border-radius", "0px");

            if(template !== "none")
            {
                $("#confirmCreateCustContract").attr("data-templateid", template.id);
                $("#contractTemplate").slideDown();
                let containerToAppend = document.getElementById("contractTemplate");
                let time = Date.now();
                constructTemplate(template, containerToAppend, time);
                $(".eachTemplate").fadeIn();

            }else
            {
                $("#contractTemplate").css("display", "none");
            }

        
        });


    }



    //GET CONTRACT FORM
    function getContractForm(time, edit, packageObj, packageID)
    {
        if(edit == 0){
            var data = null;
        }
        let name = getCustomerName();
        let customerID = getCustomerID();
        let email = getCustomerEmail();
        return new Promise(function (resolve,reject) 
        { 
          $.ajax({
          url: "../customercontractform.php",
          method: "POST",
          data: 
          {
            customerID: customerID,
            email: email,
            name: name,
            time: time,
            getForm: 1,
            data: data,
            packageObj: packageObj,
            packageID: packageID,
            edit: edit
          },
          success: function(response){
          resolve(response);
          }
          });
        });
    }



    //CONSTRUCT CONTRACT
    function constructEachCustCont(data, containerToAppend, preOrAp)
    {
       
        var counter = Math.random();
        counter = counter.toString();
        counter = counter.replace(".", "");

        let packageName = data.packageName;
 
        if(packageName == "null" || packageName == "undefined" || packageName == null || packageName == undefined || packageName == "")
        {
            packageName = "Custom";
        }
        let packageID = data.packageID;
        let totalNewWebPages = data.currentTotalPagesNewWebsite;
        let newWebsiteString = "";
        let costPerPage = 0;


        if(packageID == undefined || packageID == "null" || packageID == null)
        {
            costPerPage = 200;
        }
        else
        {
            costPerPage = 100;
        }
     
        let totalForNewPages = costPerPage * parseInt(totalNewWebPages);
    
        if(data.status == "Developer will contact you shortly after review")
        {
            data.status = "Developer will contact you shortly after review<br>You will be able to make payments after a developer has approved your project";
        }

        //PREPEND OR APPEND EACH CONTRACT WRAP
        if(preOrAp == "pre")
        {
            $(containerToAppend).prepend("<div class='eachCustomerContract eachCustomerContract"+data.id+"' id='eachCustomerContract"+counter+"'><span class='admin-eachcontract-name'>"+data.name+"</span><br><span class='admin-eachcontract-email'>"+data.email+"</span><br></div>");
        }
        if(preOrAp == "ap")
        {
            $(containerToAppend).append("<div class='eachCustomerContract eachCustomerContract"+data.id+"' id='eachCustomerContract"+counter+"'><span class='admin-eachcontract-name'>"+data.name+"</span><br><span class='admin-eachcontract-email'>"+data.email+"</span><br></div>");
        }
        $(".eachCustomerContract").css("background-color", "transparent");





        $("#eachCustomerContract"+counter).append("<span>Created: "+data.dateTime+"</span><br><span>Contract ID: "+data.id+"</span><br><br><div class='contract-packageName'><span class='admin-eachCustCont-spanHeading'>PACKAGE:<br></span>"+packageName+"</div><br><span class='admin-eachCustCont-spanHeading'>Deliverables:<br>For:</span> "+data.projectFor+" "+newWebsiteString+"<br><div class='eachCustomerContract-totalPagesNewSite' id='eachCustomerContract-totalPagesNewSite"+counter+"'>Total Pages For New Site: "+totalNewWebPages+" @ $"+costPerPage+" each</div><span class='admin-eachCustCont-spanHeading'>Additionals:</span><br><span class='admin-eachCustCont-deliverablesBody' id='admin-eachCustCont-deliverablesBody"+counter+"'></span><br><span class='admin-eachCustCont-spanHeading'>Additional Information</span><br>"+data.additionalInfo+"<br><br><span class='admin-eachCustCont-spanHeading'>Total:</span>$"+data.totalPrice+"<br><span class='admin-eachCustCont-spanHeading'>Amount Paid:</span> $"+data.amountPaid+"<br><span class='admin-eachCustCont-spanHeading'>Status:</span> "+data.status+"<div class='newUserContractButtons'><button class='editCustomerContract hoverImage' id='reqeditCustomerContract"+counter+"'>Make Changes</button><button class='editCustomerContract hoverImage' id='contractMakeAPay"+counter+"'>Make A Payment</button><button class='hoverImage'>Open Folder</button></div><br><hr>");
        if(totalNewWebPages == 0)
        {
            $("#eachCustomerContract-totalPagesNewSite"+counter).remove();   
        }
        if(data.projectFor == "Existing Website or Application")
        {
            $("#eachCustomerContract-totalPagesNewSite"+counter).remove();
        }
        if(packageName == "Custom")
        {
            $("#eachCustomerContract-totalPagesNewSite"+counter).remove();
        }



        

        if(data.canMakePayment == 0 || data.canMakePayment == "undefined" || data.canMakePayment == undefined)
        {
            $("#contractMakeAPay"+counter).remove();
        }



        //CONTACT FOR CHANGES
        $("#reqeditCustomerContract"+counter).on("click", function()
        {
            alert("error code");
           loadLiveChat(1); 
           setTimeout(function()
           {
           sendMessage("I would like to make changes to my contract!<br>Contract ID: "+data.id+"").then(function(r){
            if(r == "error")
            {
                clickDelay = 0
                return;
            }

            let data = JSON.parse(r);
            constructChatMessage(data, "after");
            clickDelay = 0;
            $("#liveChatTA").val("");

            });
        }, 500);
        });


        let servicesArray = JSON.parse(data.servicesArray);
        let number = 1;
    
    
        if(servicesArray !== "null" && servicesArray !== null)
        {

            for(var i = 0; i<servicesArray.length; i++)
            {
             let service = servicesArray[i];
             let totalCostForThisItem = parseInt(service[1]) * parseInt(service[3]);
             let string = "<span>"+number+". "+service[2]+" x "+service[3]+" ($"+totalCostForThisItem+"</span>)<br>";
             $("#admin-eachCustCont-deliverablesBody"+counter).append(string);
             number ++;

            }
        }  
    


        //EDIT CONTRACT FOR ADMIN
        $("#editCustomerContract"+counter).on("click", function()
        {
             let time = Date.now();
            editContract(data, time).then(function(r)
        {

        let klass = "admin-ConstumerNotes curvedTopRight backgroundColorWhite";
        let display = "initial"
        let adminHeading = "";
        let container = getContainer(time, display, klass);
        let heading = getHeadingAdmin(time,adminHeading, klass);
        let scroller = getAdminScroller(time);
        $(".wrap").append(container);
        $("#containerRelativePos"+time).append(heading);
        $("#containerRelativePos"+time).append(scroller);

        let containerToAppend = document.getElementById("admin-scroller"+time+"");
          
        $(containerToAppend).append(r);

        });

    });

  }








    //LOAD PACKAGES
    function loadPackages()
    {
        var time = Date.now();
        let Display = "initial";
        let overflow = "hidden";
        let klass = "contactWrap";
        var container = getContainer(time, Display, klass);
        $(".wrap").append(container);
        $("#containerRelativePos"+time).css("background-color", "transparent");
        $("#containerRelativePos"+time).css("overflow", overflow);
        let headingContainer =  getHeading(time, "Packages", "", "100", "#c6d4d2");
        $("#containerRelativePos"+time).append(headingContainer);
        $("#containerRelativePos"+time).append("<div class='contactSlideUpContainer' id='contactSlideUpContainer"+time+"'><div class='contactSlideUpWrap'><div class='backgroundImageContainer packagesBackground'></div><div class='packages-scroll-wrap' id='packages-scroll-wrap"+time+"'><div class='whiteShadow'></div><div class='selectPackagesFor'><div class='selectPackagesFor-absolute'><div class='fadeInMessage' id='fadeInMessage"+time+"'>Do you want to see packages for <br>a new project or an exisiting one?</div><span class='selectPackagesFor-heading' style='font-size: 20px;'>I WANT TO SEE PACKAGES FOR</span><br><select class='hoverImage' id='newExistPackSelect"+time+"'><option value='' selected disabled>SELECT ONE</option><option value='New'>New Site or Application</option><option value='Existing'>Existing Site or Application</option></select></div></div> </div></div></div>");
        $("#backIcon"+time).remove();
        $("#heading"+time).append("<button class='close hoverImage' data-value='packages' data-time = '"+time+"'>X</button>");

        //GET PACKAGES PAGE
        getPackagesPage().then(function(r)
        {
            $(".packages-scroll-wrap").append(r);
            $("#newExistPackSelect"+time).fadeIn(2000);
             //SCROLL
            $(".packages-flexwrap").on("scroll", function()
            {
                baseBot.closeHelpMessages();
            });
  
        });



       


        //SELECT
        $("#newExistPackSelect"+time).on("change", function()
        {
           
           
            let value = $(this).val();
            $(this).val("");
            if(value !==""){
                $(".selectPackagesFor").slideUp("fast");

                setTimeout(function()
                {
                    $(".packages-wrap").slideDown("fast");
                    $(".eachPackageCategory").css("display", "none");
                    if(value == "New")
                    {
                      $("#packages-flex-wrap-new").slideDown();
                      baseBot.alertUser("These are our packages for customers who need a brand spanking new site or application.  After you have selected a contract, you will have the opportunity to add additional features not included in the contract at a discounted price!", "topLeft", 10);
                      
                    }
                    if(value == "Existing")
                    {
                        $("#packages-flex-wrap-existing").slideDown();
                        baseBot.alertUser("These are our packages for customers who already have a website and wants more from their site.  After you have selected a contract, you will have the opportunity to add additional features not included in the contract at a discounted price!", "topLeft", 10);
                    }

                  

                }, 500);

            }
        });

        $("#contactSlideUpContainer"+time).animate({"top":"70px"}, "slow");
        setTimeout(function(){
        $("#heading"+time).animate({
            marginLeft: "0%"
        }, 500);
        $("#fadeInMessage"+time).animate({
            marginLeft: "2.5%"
        }, 1000);
        baseBot.showPackagesLiveChatHelp();
        },500);
    

    


    }



  
    //GET PACKAGES PAGE
    function getPackagesPage()
    {
        return new Promise(function (resolve,reject) { 
            $.ajax({
           url: "../packages.php",
           method: "POST",
           data: {
            getpackages: 1
           },
           success: function(response){
           clickDelay = 0;
           resolve(response);
           }
           });
           
           });   
    }


  
    //LOAD CONTACT WINDOW
    function loadContact()
    {
    
        var time = Date.now();
        let Display = "initial";
        let overflow = "hidden";
        let klass = "contactWrap";
        var container = getContainer(time, Display, klass);
        $(".wrap").append(container);
        $("#containerRelativePos"+time).css("background-color", "transparent");
        $("#containerRelativePos"+time).css("overflow", overflow);
    
    
    
        //CONTACT ITEMS
        let headingContainer =  getHeading(time, "Team", "", "100", "#c6d4d2");
        $("#containerRelativePos"+time).append(headingContainer);
        $("#containerRelativePos"+time).append("<div class='contactSlideUpContainer' id='contactSlideUpContainer"+time+"'><div class='contactSlideUpWrap'><div class='backgroundImageContainer contactBackGround'></div><div class='contact-scroll-wrap'></div></div></div>");
        $("#backIcon"+time).remove();
        
        $("#heading"+time).append("<button class='close hoverImage' data-value='team' data-time = '"+time+"'>X</button>");


        getTeam().then(function(r)
        {

            $(".contact-scroll-wrap").append("<div class='teamWrap'></div>");
            let data = JSON.parse(r);
    
           for(var i = 0; i<data.length; i++)
           {
    
            let member = data[i];
            constructTeamMember(member);
      
        }

         });
    
    
    
    
    
    
    
          //BACK
          $("#backIcon"+time).on("click", function(){
            let subHeading = document.getElementById("subHeading"+time).textContent;
            goBack(subHeading, time);
    
         });
    
    
    
    
        //ANIMATE
       
        $("#contactSlideUpContainer"+time).animate({"top":"70px"}, "slow");
        setTimeout(function(){
        $("#heading"+time).animate({
            marginLeft: "0%"
        }, 500);
        },500);
    
    }
    
    


    function getTeam()
    {
        return new Promise(function (resolve,reject) { 
            $.ajax({
           url: "../formhandlers/team.php",
           method: "POST",
           data: {
            getTeam: 1
           },
           success: function(response){
           clickDelay = 0;
           resolve(response);
           }
           });
           
           });   
    
    }
  



    
    //LOAD SHOWROOM
    function loadShowRoom()
    {

        
        var time = Date.now();
        let Display = "initial";
        let overflow = "hidden";
        let klass = "contactWrap";
        var container = getContainer(time, Display, klass);
        $(".wrap").append(container);
        $("#containerRelativePos"+time).css("background-color", "transparent");
        $("#containerRelativePos"+time).css("overflow", overflow);

        let headingContainer =  getHeading(time, "Showroom", "", "100", "#f1eaea");
        $("#containerRelativePos"+time).append(headingContainer);
        $("#containerRelativePos"+time).append("<div class='contactSlideUpContainer' id='contactSlideUpContainer"+time+"' style='border-top: none; display: none;'><div class='contactSlideUpWrap'><div class='backgroundImageContainer showroombackground'></div><div class='whiteShadow'></div><div class='mycontracts-scroll-wrap mycontracts-scroll-wrap"+time+"' id='mycontracts-scroll-wrap' data-start='0' style='overflow: hidden;'><div class='showRoomFlexScroll' id='showRoomFlexScroll'></div></div></div></div>");
        $("#backIcon"+time).remove();
        
        $("#heading"+time).append("<button class='close hoverImage' data-value='team' data-time = '"+time+"' style='color: black;'>X</button>");
        $("#heading"+time).css("background-color", "#f5f5f6");
        $("#heading"+time).css("color", "black");
        $("#contactSlideUpContainer"+time).fadeIn("4000");


        //GET THE TEMPLATES
        let start = $(".mycontracts-scroll-wrap"+time).attr("data-start");
        let containerToAppend = document.getElementById("showRoomFlexScroll");
        getTemplates(start).then(function(r)
        {

            if(r == "end"){
                return;
            }
            if(r == "error"){
                return;
            }

            let data = JSON.parse(r);
            for(var i=0; i<data.length; i++)
            {


                let template = data[i];
                constructTemplate(template, containerToAppend, time);


            }

            $(".mycontracts-scroll-wrap"+time).attr("data-start", 10);
            
        setTimeout(function()
        {
     
            var elements = document.getElementsByClassName("eachTemplate"+time);
            fadeInOneatTime(elements);        
        
            blinkElementsTimer = setInterval(function(){
                blinkElements(elements);
            }, 6000);
            

        }, 500);

        });

       




        $("#showRoomFlexScroll").animate({
            marginLeft: "0%"
        }, 500);
        $("#contactSlideUpContainer"+time).css("top", "70px");
        setTimeout(function(){
        $("#heading"+time).animate({
            marginLeft: "0%"
        }, 500);
        },500);


        baseBot.alertUser("These are some applications we've created.  If you like one, click GET STARTED and we will build you one just like it.", "topLeft", 10);
        
       
    }
    
    







    //CONSTRUCT TEMPLATES

    function constructTemplate(template, containerToAppend, time)
    {
        
        let imagesString = template.screensArray;
        let imagesstringArray = imagesString.split(',');
        
        $(containerToAppend).append("<div class='eachTemplateBlockContainer'><div class='eachTemplateName'>"+template.name+"</div><div class='eachTemplate eachTemplate"+time+"' id='eachTemplate"+template.id+"' data-id='"+template.id+"'><div class='eachTempInfo' id='eachTempInfo"+template.id+"'><div class='eachTempInfoRelative'><div class='eachTempInfoRelative-absolute'>"+template.description+"</div></div></div><div class='eachTemplateMainImg'><img src='assets/templatescreens/"+imagesstringArray[1]+"'></div><div class='eachTemplateMobileImage'><img src='assets/templatescreens/"+imagesstringArray[2]+"'></div><div class='seePreviewButtonCont'><button class='hoverImage seeTemplatePreview' data-link='"+template.link+"'>Preview</button><button class='hoverImage template-getStarted' id='tempgetstarted"+template.id+"' data-link='"+template.link+"' data-id='"+template.id+"' style='font-weight: bold;'>GET STARTED</button></div><div></div>");
        

        //TEMPLATE GET STARTED
        $(document).on("click", "#tempgetstarted"+template.id+"", function()
        {

            let packageID = template.packageID;
            let projectFor = "Existing Website or Application";
            getPackage(packageID, projectFor).then(function(r)
            {
    
            
                loadContracts(r, template);
           
            });

        

        });



    }
    



    //MOUSE OVER FOR EACH TEMPLATE
    $(document).on("mouseover touchstart", ".eachTemplate",function()
    {
       
        let id = $(this).attr("data-id");
        $(this).css("border", "2px solid #f3e5e5");
        $(".eachTempInfo").css("display", "none");
        $("#eachTempInfo"+id).css("display", "initial");

    });
    $(document).on("mouseout touchend", ".eachTemplate",function()
    {

        let id = $(this).attr("data-id");
        $("#eachTempInfo"+id).css("display", "none");

    });

    //FADE IN ONE AT AT TIME
    function fadeInOneatTime(elements)
    {
        for(var i = 0; i<elements.length; i++)
        {
            setTimeoutDelay = setTimeoutDelay + 1300;
            let thisElement = elements[i];

            $(thisElement).fadeIn(setTimeoutDelay);
            
            if(i == elements.length - 1)
            {
                setTimeoutDelay = 0;
            }

        }
    }

    function blinkElements(elements)
    {

        $(elements).fadeTo(500, .7).fadeTo(500, 1);
        

    }
    function blinkElementsHard(elements)
    {

        $(elements).fadeTo(500, .1).fadeTo(500, 1).fadeTo(500, .1).fadeTo(500, 1).fadeTo(500, .1).fadeTo(500, 1);
        

    }



  


    
    //CONSTRUCT EACH CATEGORY
    function constructEachCategory(container, category)
    {
        var counter = Math.random();
        counter = counter.toString();
        counter = counter.replace(".", "");
    
        $(container).append("<div class='eachCatWrap' id='eachCatWrap"+counter+"'><div class='eachCatContainer zeroWidthContainer colorWhite' id='eachCatContainer"+counter+"'><div class='inlineflexdiv' id='inlineflexdiv"+counter+"'></div></div></div>");
    
        $("#inlineflexdiv"+counter).append("<div class='eachCatLeft' id='eachCatLeft"+counter+"'><span class='categoryName' id='categoryName"+counter+"'>"+category.name+"</span><br>"+category.details+"</div><div class='eachCatRight' id='eachCatRight"+counter+"'><img class='hoverImage' src='../assets/"+category.photo+"'></div>");
    
    
        
    
    
        //HOVER
        $("#eachCatRight"+counter).on("mouseover", function(){
    
            $("#eachCatWrap"+counter).addClass("rightWhiteLight");
    
        });
        $("#eachCatRight"+counter).on("mouseout touchend", function(){
    
            $("#eachCatWrap"+counter).removeClass("rightWhiteLight");
    
        });
    
    
    
    
    
    
        //ANIMATE WIDTH
        setTimeout(function(){
    
            $("#eachCatContainer"+counter).stop().animate({width: "98%"}, 1000, "linear");
            $("#eachCatLeft"+counter).fadeTo(3000, 1);
    
        }, delay);
    
        delay = delay + 300;
    
    
    }
    
    


    //GET TEMPLATES
    function getTemplates(start)
    {

        return new Promise(function (resolve,reject) { 
            $.ajax({
           url: "../templates.php",
           method: "POST",
           data: {
            start: start,
            getTemplates: 1
           },
           success: function(response){
           clickDelay = 0;
           resolve(response);
           }
           });
           
           }); 


    }


    
    //GET CATEGORIES
    function getCategories(start)
    {

        return new Promise(function (resolve,reject) { 
            $.ajax({
           url: "../formhandlers/getcategories.php",
           method: "POST",
           data: {
            start: start
           },
           success: function(response){
           clickDelay = 0;
           resolve(response);
           }
           });
           
           });   
    
    }
    



    //GET NEW CONTAINER
    function getHeading(time, heading, subHeading, marginLeft, backgroundcolor)
    {

        if(heading == "BaseSolutions"){
            heading = "TokenCO2 <span id='entityLoggedIn'></span>";
           
    
        }
      
        return "<div class='heading' id='heading"+time+"' style='margin-left:"+marginLeft+"%; background-color: "+backgroundcolor+";'><span id='heading'>"+heading+"</span></div>";
     
    
       
    }
    function getHeadingTwo(time, headingClass)
    {

        
        return "<div class='headingTwo' id='headingTwo"+time+"'><button class='close hoverImage' data-value='"+headingClass+"' data-time='"+time+"'>X</button></div>";
    
       
    }





    //GET NEW CONTAINER
    function getContainer(time, display, klass)
    {
       
       
    
        return "<div class='container "+klass+"' id='container"+time+"' style='display: "+display+"'><div class='containerRelativePos' id='containerRelativePos"+time+"'></div></div>";
    
    }
    








    //GO BACK
    function goBack(subHeading, time)
    {

        //FROM CATEGORY
        if(subHeading == "Category")
        {

            $("#container"+time).fadeOut();    
             setTimeout(function(){
    
               $(".welcomeContainer").fadeIn();
              $("#container"+time).remove();    
             }, 1500);
    
        }


        //FROM CONTACT
         if(subHeading == "")
        {

             $(".contactSlideUpContainer").animate({"top":"200%"}, "slow");
                $("#heading"+time).animate({
                marginLeft: "200%"
                }, 500);
                setTimeout(function(){
             $("#container"+time).remove();    
              }, 1500);

    
        }
    

    }
    


    //SEND MESSAGE
    function sendMessage(message)
    {

        let chatID = getChatID();
        let customerID = getCustomerID();

        return new Promise(function (resolve,reject) { 
            $.ajax({
           url: "../formhandlers/sendmessage.php",
           method: "POST",
           data: {
            message: message,
            chatID: chatID,
            customerID: customerID,
            sendMessage: 1
           },
           success: function(response){
           clickDelay = 0;
           resolve(response);
           }
           });
           
           });   
    }









    //REFRESH CHATS
    function setChatRefreshInterval()
    {

        //CHECK FOR MORE NEW MESSAGES
        convoRefreshInteral = setInterval(function()
        {
           
            let customerID = getCustomerID();
            let chatID = getChatID();
            getChatMessages(customerID, chatID, 0).then(function(r)
            {
                
                if(r == "end")
                {
                }else
                {
        
             
                    let dataBefore = JSON.parse(r);
                    let data = dataBefore.reverse();
                    for(var i = 0; i < data.length; i++)
                    {
              
                        let message = data[i];
                        if($(".eachMessage"+message.id).length == 0)
                        {
                            constructChatMessage(message, "after");
                            $(".liveChatTextArea").slideDown();
                            $(".liveChatTextArea").css("display", "inline-flex");
                        }
              
                    }
          
              
                }
        
            
      
            });




     
         }, 5000);

    }






    //FUNCTIONS 

  

 



    //LOG IN CUSTOMER
    function logCustomerIn()
    {
        let email = $("#input-login-email").val();
        let password = $("#input-login-password").val();

        return new Promise(function (resolve,reject) 
        { 
            $.ajax({
            url: "../logcustomerin.php",
            method: "POST",
            data: 
            {
                email: email,
                password: password,
                li: 1
            },
            success: function(response)
            {
            resolve(response);
            }
            });
        });
        
    }



    //GET APPS
    function getApps(currentApps)
    {
        if(currentApps == "livechat")
        {
            var url = "getlivechatapps.php";
        }
        return new Promise(function (resolve,reject) 
        { 
            $.ajax({
            url: "../"+url+"",
            method: "POST",
            data: 
            {
                getapps: 1
            },
            success: function(response)
            {
            resolve(response);
            }
            });
        });
    }




    //LOAD CUSTOMERS PROJECT FOLDERS

    function loadProjectFolders()
    {
        let currentMargTop = 10;
        var time = Date.now();
        let Display = "initial";
        let overflow = "hidden";
        let klass = "contactWrap";
        var container = getContainer(time, Display, klass);
        $(".wrap").append(container);
        $("#containerRelativePos"+time).css("background-color", "transparent");
        $("#containerRelativePos"+time).css("overflow", overflow);

        let headingContainer =  getHeading(time, "Project Folders", "", "100", "#c6d4d2");
        $("#containerRelativePos"+time).append(headingContainer);

        $("#containerRelativePos"+time).append("<div class='contactSlideUpContainer' id='contactSlideUpContainer"+time+"'><div class='contactSlideUpWrap'><div class='backgroundImageContainer contactBackGround'></div><div class='mycontracts-scroll-wrap mycontracts-scroll-wrap"+time+"' id='scroll"+time+"' data-start='0'><div class='scrollRelative' id='scrollRelative"+time+"'></div></div><div class='refreshMyContracts'><button class='hoverImage newContractFolder' hoverImage' id='newContractFolder"+time+"'>New <span style='color: #92b992; font-size: 20px;'>+</span></button><input type='text' class='searchForFolder' placeholder = 'SEARCH'><button class='hoverImage cancelFolderSearch' style='width: 50px; color: red;'>X</button></div></div></div>");

        
        $("#heading"+time).append("<button class='close hoverImage' data-value='team' data-time = '"+time+"'>X</button>");





        //GET FOLDERS
        let customerID = getCustomerID();
        getProjectFolders(customerID).then(function(r)
        {

            

            if(r == "end")
            {
                console.log("end");
            }
        
            else
            {


                let foldersObj = JSON.parse(r);
                for(var i = 0; i<foldersObj.length; i++)
                {
                    let thisFolder = foldersObj[i];
                    let container = document.getElementById("scrollRelative"+time);
                    constructFolder(thisFolder, container, currentMargTop);
                    currentMargTop = currentMargTop + 55;
                    
                }

            
            }
        });





        $("#contactSlideUpContainer"+time).animate({"top":"70px"}, "slow");
        setTimeout(function(){
        $("#heading"+time).animate({
            marginLeft: "0%"
        }, 500);
        },500);
    }








   


    //CONTRUCT FOLDER NOTE
    function constructFolderNote(thisNote, containerToAppendNote, currentNoteNumber)
    {

        let id = thisNote.id;

        $(containerToAppendNote).append("<div class='eachFolderNote eachFolderNote"+thisNote.id+"'><div class='folderNoteBody'>"+currentNoteNumber+". "+thisNote.note+"</div><div class='folderNoteButtons'><button class='deleteButton deleteThisFoldNote"+id+"'>Delete</button></div><div class='confirmDeleteFoldNote confirmDeleteFoldNote"+id+"'>Confirm Delete? <button class='confirmDeleteThisFoldNote"+id+"'>YES</button></div><br><hr></div>");








        //DELETE
        $(".deleteThisFoldNote"+id).on("click", function()
        {
       
        
            $(this).css("display", "none");
            $(".confirmDeleteFoldNote"+id).slideDown();
            setTimeout(function()
            {
            $(".deleteThisFoldNote"+id).slideDown(10);
            $(".confirmDeleteFoldNote"+id).css("display", "none");
            }, 3000);


        });


        $(".confirmDeleteThisFoldNote"+id).on("click", function()
        {
            alert("now");
            deleteFolderNote(id).then(function(r)
            {
                if(r == "success")
                {
                    $(".eachFolderNote"+id).remove();
                }
            });
        });




    }



    //DELETE FOLDER NOTE
    function deleteFolderNote(id)
    {

        let customerID = getCustomerID();
        
        return new Promise(function (resolve,reject) 
        { 
            $.ajax({
            url: "../deletefoldernote.php",
            method: "POST",
            data: 
            {
                customerID: customerID,
                folderID: id,
                delete: 1
            },
            success: function(response)
            {
            resolve(response);
            }
            });
        });


    }


    //ADD NOTE TO FOLDER
    function addFolderNote(id, value)
    {

        let customerID = getCustomerID();
        
        return new Promise(function (resolve,reject) 
        { 
            $.ajax({
            url: "../addfoldernote.php",
            method: "POST",
            data: 
            {
                customerID: customerID,
                folderID: id,
                value: value,
                getNotes: 1
            },
            success: function(response)
            {
            resolve(response);
            }
            });
        });

    }















  //HANDLE CONTRACT
  function handleContract(customerID, name, email, newOrExisting, servicesArray, projectFor, currentTotalPages, deliveryDate, totalPrice, additionalInfo, existingcontractid, edit, packageID, packageName, totalPagesIncludes, additionalPages, templateID, projectTitle, existingFolderID)
  {
   if(servicesArray.length == 0)
   {
    servicesArray  = "null";
   }
   
    if(edit == 1)
    {
      newOrExisting = "existingContract";
    }
    
    return new Promise(function (resolve,reject) 
    { 
          $.ajax({
           url: "formhandlers/admin/customercontract.php",
           method: "POST",
           data: {
            newOrExisting: newOrExisting,
            servicesArray: servicesArray,
            projectFor: projectFor,
            currentTotalPagesNewWebsite: currentTotalPages,
            deliveryDate: deliveryDate,
            totalPrice: totalPrice,
            customerID: customerID,
            name: name,
            email: email,
            additionalInfo: additionalInfo,
            existingContractID: existingcontractid,
            packageID: packageID,
            packageName: packageName,
            totalPagesIncludes: totalPagesIncludes,
            additionalPages: additionalPages,
            templateID: templateID,
            projectTitle: projectTitle,
            existingFolderID: existingFolderID,
            handleContract: 1

           },
           success: function(response){
           clickDelay = 0;
           resolve(response);
           }
           });
           
    });   
    
  }


    //LOAD CUSTOMERS BASE
    function loadCustomersBase()
    {

        var time = Date.now();
        let Display = "initial";
        let overflow = "hidden";
        let klass = "contactWrap";
        let container = getContainer(time, Display, klass);

        $(".wrap").append(container);
        $("#containerRelativePos"+time).append("<div class='customerHomeBase-absolute' id='customerHomeBase-absolute"+time+"'></div>");



        //GET INTERFACE
        getMyBaseInterface(time).then(function(r)
        {

            if(r == "error")
            {
                return;
            }
            else
            {

                $("#customerHomeBase-absolute"+time).append(r);

            }

            if(trialToPrompt !== 0)
            {
          
                promptTrial(trialToPrompt);
                trialToPrompt = 0;            
            }
        });




       
        setTimeout(function(){
        $(".customerHomeBase-absolute").animate({
            marginLeft: "0%"
        }, 500);
        },500);

    }




    //CANCEL SUB PROMPT
    function getPromptCancel(time, id, pi)
    {
        

        getSubscription(id).then(function(r)
        {
            

            let sub = JSON.parse(r);
            let product = sub['product'];

            if(product == "livechat")
            {
                var image = "livechat-capture.JPG"
            }

            let imageString = "<img src='../assets/"+image+"'>";
            
            $(".wrap").append("<div class='promptWrap' id='promptWrap"+time+"'><div class='promptWrap-relative' id='promptWrap-relative"+time+"'></div></div>");
            $("#promptWrap-relative"+time).append("<div class='promptBox'><div class='prompt-image'>"+imageString+"</div><div class='prompt-text'><div class='prompt-text-rel'><div class='prompt-text-absolute'><span style='font-weight: bold; font-size: 24px;' id='sub-being-canceled-string'>Cancel Subscription</span><br><img class='stop-image' src='../assets/stop.png'><br><span style='font-size: 20px;' class='quest-text'>Are you sure you want to cancel your "+product+" subscription?</span><div class='promptListItems' id='pli"+time+"'><ul class='pli-ul' id='pli-ul"+time+"'></ul></div><div class='promptResponseDiv' id='promptResponseDiv"+time+"'><span id='promptResponse'></span></div><div class='prompt-buttons'><button style='color: red;' class='csc' id='csc"+time+"'>Cancel</button><button class='dcs'>Nevermind</button></div><div class='prompt-loading-div'></div></div></div></div></div>");    

            $("#csc"+time).on("click", function()
            {
                cancelSub(id, product, pi).then(function(r)
                {
                    if(r == "success")
                    {
                        
            
                        
                        $(".showCustomersSubs-button").trigger("click");
                        $(".stop-image").remove();

                        $(".quest-text").html("Your subscription was successfully canceled<br>If you did this by accident, speak to an agent to resume service.");
                        $(".quest-text").css("color", "green");
                        $(".quest-text").css("font-weight", "bold");
                        $(".prompt-buttons").empty();
                        $(".prompt-buttons").append("<button class='dcs'>Got it!</button>");

       

                    }
                    else
                    {

                    }
                });
            });

        });

    }



    //CANCEL SUB
    function cancelSub(id, product, pi)
    {

        let customerSession = getCustomerSession();
        let customerID = getCustomerID();

        return new Promise(function (resolve,reject) 
        { 
              $.ajax({
               url: "../cancelsub.php",
               method: "POST",
               data: 
               {
                
                id: id,
                customerSession: customerSession,
                customerID: customerID,
                product: product,
                pi: pi,
                cancel: 1
    
               },
               success: function(response){
               clickDelay = 0;
               resolve(response);
               }
               });
               
        }); 
    }


    //GET THE SUBSCRIPTION DETAILS
    function getSubscription(id)
    {

        return new Promise(function (resolve,reject) 
        { 
              $.ajax({
               url: "../getsubscription.php",
               method: "POST",
               data: 
               {
                
                id: id
    
               },
               success: function(response){
               clickDelay = 0;
               resolve(response);
               }
               });
               
        }); 
    }



    //GET EMPTY WRAP
    function getEmptyWrapForPrompt(time)
    {
        $(".wrap").append("<div class='promptWrap' id='promptWrap"+time+"'><div class='promptWrap-relative' id='promptWrap-relative"+time+"'></div></div>");
    }

    //GET A CONTAINER FOR PROMPTS
    function promptTrial(trialToPrompt)
    {
        let time = Date.now();
        let listItems = "";
        getEmptyWrapForPrompt(time);


        if(trialToPrompt == "livechat")
        {
            item = "Live Chat"
            listItems = "<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li><li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li><li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>";
        }

        $("#promptWrap-relative"+time).append("<div class='promptBox'><div class='prompt-image'><img src='../assets/livechat-capture.jpg'></div><div class='prompt-text'><div class='prompt-text-rel'><div class='prompt-text-absolute'><span style='font-weight: bold; font-size: 24px;'>"+item+"</span><br><span style='font-size: 20px;'>Try it out<br></span><div class='promptListItems' id='pli"+time+"'><ul class='pli-ul' id='pli-ul"+time+"'>"+listItems+"</ul></div><div class='promptResponseDiv' id='promptResponseDiv"+time+"'><span id='promptResponse'></span></div><div class='prompt-buttons'><button class='confirm-trial' id='confirm-start-trial"+time+"' style='font-size: 16px; background-color: #f5f5f5; color: green'>Start Trial</button><button class='cancel-trial-prompt' id='cancel-trial-prompt"+time+"' style='font-size: 13px; color: red;'>Nevermind</button></div><div class='prompt-confirm-div'></div><div class='prompt-loading-div'></div></div></div></div></div>");

        //START TRIAL
        $("#confirm-start-trial"+time).on("click", function()
        {

            $(".prompt-buttons").css("display","none");
            
            startTrial(trialToPrompt).then(function(r)
            {
                
                if(r !== "success")
                {
                    $(".prompt-confirm-div").append(r);
                }
                if(r == "success")
                {
                    $(".promptResponseDiv").append("SUCCESS");
                    $(".promptWrap").remove();
                    $(".showCustomersSubs").trigger("click");
                }
         


            });
        });
        //START TRIAL
        $("#cancel-trial-prompt"+time).on("click", function()
        {
            $(".promptWrap").remove();
        });
        

    }


    //START TRIAL
    function startTrial(trialToPrompt)
    {
        let customerID = getCustomerID();
        return new Promise(function (resolve,reject) 
        { 
              $.ajax({
               url: "../starttrial.php",
               method: "POST",
               data: 
               {
                
                starttrial: 1,
                trialToPrompt: trialToPrompt,
                customerID: customerID
    
               },
               success: function(response){
               clickDelay = 0;
               resolve(response);
               }
               });
               
        }); 
    }


    
    //GET MY BASE INTERFACE
    function getMyBaseInterface(time)
    {
        return new Promise(function (resolve,reject) 
        { 
              $.ajax({
               url: "../customersbaseinterface.php",
               method: "POST",
               data: 
               {
                
                getMyBaseInterface: 1,
                time: time
    
               },
               success: function(response){
               clickDelay = 0;
               resolve(response);
               }
               });
               
        }); 


    }




    //CONSTRUCT LOGIN FROM SHOWROOM
    function loadCustomerMainLogin(heading)
    {
        var time = Date.now();
        let Display = "initial";
        let overflow = "hidden";
        let klass = "contactWrap";
        let container = getContainer(time, Display, klass);

        $(".wrap").append(container);
        $("#containerRelativePos"+time).css("background-color", "transparent");
        $("#containerRelativePos"+time).css("overflow", overflow);

        let headingContainer =  getHeading(time, "<img src='assets/logosPng/65814_BaseSolution_J_05.png'>", "", "100", "#c6d4d2");
        $("#containerRelativePos"+time).append(headingContainer);
        
        $("#containerRelativePos"+time).append("<div class='contactSlideUpContainer' id='contactSlideUpContainer"+time+"'><div class='customerMainLogin'><div class='customerMainLogin-absolute'><div class='customerMainLogin-heading'>"+heading+"</div><div class='customerMainLogin-inputs'></div><div class='customerMainLogin-buttons'></div><div class='customerLoginRespDiv'></div></div></div></div>");
        $("#backIcon"+time).remove();
        
        $("#heading"+time).append("<button class='close hoverImage closeMainLoginForm' data-value='team' data-time = '"+time+"'>X</button>");



        //GET FORM
        getLoginFormInputs().then(function(inputsObj)
        {
           
            $(".customerMainLogin-inputs").append(inputsObj.login.Inputs);
            $(".customerMainLogin-buttons").append(inputsObj.login.Buttons);
            
        });
  






        $("#contactSlideUpContainer"+time).animate({"top":"70px"}, "slow");
        setTimeout(function(){
        $("#heading"+time).animate({
            marginLeft: "0%"
        }, 500);
        },500);



      
    }




    //GET LOGIN FORM
    function getLoginFormInputs()
    {

        return new Promise(function (resolve,reject) 
        { 

            let inputsObj = 
            {
                login: 
                {

                    Inputs: "<p class='input-login-email-p' id='input-login-email-p'>E-mail</p><input type='email' class='input-login-email' id='input-login-email' placeholder='E-mail'/><p class='input-login-pass-p' id='input-login-pass-p'>Password</p><input type='text' class='input-login-password' id='input-login-password' placeholder='Password'/>",
                    
                    Buttons:"<button class='button-customerlogin-toggle cleanButton' id='button-customerlogin-toggle-newAccount' style='background-color: transparent; font-size: 12px;'>Create Account</button><button class='button-customerlogin-submitlogin cleanButton' id='button-customerlogin-submitlogin' style='font-size: 16px; color: #91a5a2; background-color: #f5f5f5;'>Login</button>"    

                },

                signUp:
                {
                    Inputs: "<p class='input-signup-name-p' id='input-signup-name-p'>E-mail</p><input type='text' class='input-signup-name' id='input-signup-name' placeholder='Name'/><p class='input-signup-email-p' id='input-signup-email-p'>E-mail</p><input type='email' class='input-signup-email' id='input-signup-email' placeholder='E-mail'/><p class='input-signup-pass-p' id='input-signup-pass-p'>Password</p><input type='text' class='input-signup-password' id='input-signup-password' placeholder='Password'/>",
                    
                    Buttons:"<button class='button-customerlogin-toggle cleanButton' id='button-customerlogin-toggle-signin' style='background-color: transparent; font-size: 12px;'>Sign In</button><button class='button-customerlogin-createaccount cleanButton' id='button-customerlogin-createaccount' style='font-size: 17px; color: #91a5a2;'>Create</button>"  
                    
                }
            }


            resolve(inputsObj);
        });

    }





    //CHECK IF USER IS LOGGED IN
    function checkIfLoggedIn()
    {
        let customerName = getCustomerName();
        let customerSession = getCustomerSession();
        let customerID = getCustomerID();
        let chatID = getChatID();
    
        return new Promise(function (resolve,reject) 
        { 
            $.ajax({
            url: "../formhandlers/checkifloggedin.php",
            method: "POST",
            data: 
            {
            customerName: customerName,
            customerSession: customerSession,
            customerID: customerID,
            chatID: chatID,
            checkLoggedIn: 1
            },
            success: function(response)
            {
            resolve(response);
            }
            });
        });
    
    }










    function hideNavMobile()
    {

        $("#navMobile").animate({
            marginLeft: "100%"
        }, 500);
        $(".showNav").fadeIn();

    }

    //GET BACKGROUND WITH IMAGE
    function getBGImageContainer(bgImage)
    {

        return "<div class='backgroundContainer'><div class='bgContainerRel'><img src='assets/"+bgImage+"'></div><div class='whiteShadow'></div></div>";

    }

    //CLOSE
    $("body").on("click", ".close",function()
    {
        $("#closeHelpMessages").trigger("click");
        let winToClose = $(this).attr("data-value");
        let time = $(this).attr("data-time");
     
      

        //CLOSE SHOW ROOM
        if(winToClose == "showRoom")
        {
            $(".showRoomDoor").animate({
                marginLeft: "0%"
            }, 500);
          

            setTimeout(function(){
                $("#container"+time).fadeOut();
            $(".homePage").animate({
                marginLeft: "0%"
            }, 1000);
            },1000);
    

         
    
        }

        //CLOSE TEAM
        if(winToClose == "team")
        {

            $("#contactSlideUpContainer"+time).animate({"top":"200%"}, "slow");
            setTimeout(function(){
            $("#heading"+time).animate({
                marginLeft: "100%"
            }, 500);
            },500);

        }
         //CLOSE PACKAGES
         if(winToClose == "packages")
         {
    
            $(".helpMessageLiveChat-packages").remove();
             $("#contactSlideUpContainer"+time).animate({"top":"200%"}, "slow");
             setTimeout(function(){
             $("#heading"+time).animate({
                 marginLeft: "100%"
             }, 500);
             },500);
 
         }




        setTimeout(function(){
            $("#container"+time).remove();
        }, 1000);

    });






    //BASEBOT
    const baseBot = 
    {
        //DELAY
        typeCharacterDelay: 0,





        //WELCOME
        welcome: function()
        {
            $(".wrap").append("<div class='helpMessages helpMessageBottomRight' id='helpMessageBottomRight'><div class='closeHelpMessages'><button class='hoverImage' id='closeHelpMessages'>X</button>Bot</div>Welcome to TokenCO2<br></div>");
            $(".helpMessageBottomRight").fadeIn();
            let message = "I will assist you whenever I can.  Click the Chat icon if you want further assistance";
            let container = document.getElementById("helpMessageBottomRight");
            let speed = 15;
            this.type(message, container, speed);
            setTimeout(function(){
                let element = document.getElementById("LiveChatImgGreen");
                blinkElementsHard(element);
            }, 2000);
        },










        //SHOW HELP WITH PACKAGE MESSAGE
        showPackagesLiveChatHelp: function()
        {
            this.closeHelpMessages();
            let randNum = randomID();
         $(".wrap").append("<div class='helpMessages helpMessageLiveChat-packages' id='helpMessageLiveChat-packages'><div class='closeHelpMessages'><button class='hoverImage' id='closeHelpMessages'>X</button>Bot</div><div class='helpMessageBody' id='"+randNum+"'></div></div>");
         $(".helpMessageLiveChat-packages").fadeIn("slow");
 
         let message = "Do you need an agent to help you choose a package?";
         let container = document.getElementById(randNum);
         let speed = 50;
         this.type(message, container, speed);
 
        },




        type:  function(message, container, speed)
        {      
 
         for(var i = 0; i<message.length; i++)
         {
            let character = message[i];
            this.typeCharacter(character, container);
            this.typeCharacterDelay = this.typeCharacterDelay + speed;
            if(i == message.length - 1)
            {
                 this.typeCharacterDelay = 0;
            }
         }
     
        },




        //TYPE CHARACTER
        typeCharacter: function(character, container)
        {
 
            setTimeout(function()
            {
             $(container).append(character);
            }, this.typeCharacterDelay);
     
        },




        //REMOVE MESSAGE
        closeHelpMessages: function()
        {

         $(".helpMessages").remove();

        },

        


        //ALERT USER
        alertUser: function(message, location, speed)
        {

            this.closeHelpMessages();
            $(".wrap").append("<div class='helpMessages "+location+"BotAlert' id='"+location+"BotAlert'><div class='closeHelpMessages'><button class='hoverImage' id='closeHelpMessages'>X</button>Bot</div></div>");
            $(".helpMessages").fadeIn();
            let container = document.getElementById(location+"BotAlert");
            this.type(message, container, speed)

        }
 




    }
    baseBot.welcome();


    //RANDOM ID
    function randomID() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
   }















   
});