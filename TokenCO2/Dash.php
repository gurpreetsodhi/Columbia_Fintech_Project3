<?php

$time = time();
$userType = 'gov';

?>

<div class='wrap-window wrap-window<?php echo $time?>'>
    <div class='menu'>
        <input type='text' placeholder = 'Search'><img src='assets/redx.png' class='hoverImage'>
        
    </div>
   


    <div class='fiftyWindow'>
        
        <div class='left-side'>
			
			<h1 class='deployedHeading'>Deployed Contract</h1>
            
            <div class='control-pending-contract' style='height: 50%;'><!-- CONTROL-->
                <div class='control-relative'>
                    <div class='control-bg'>
                        <img src='assets/contactbackgroundone.jpg'>
                    </div>
                    <div class='control-content'>
                        <div class='control-content-rel control-content-rel<?php echo $time?>'>
                            <div class='control-content-left control-content-left<?php echo $time?>''>
                                <div class='control-left-flex'>
                                    <div class='contractDetails contractDetails<?php echo $time?>' style='width: 100%;'><!--Start-->
                                        <div class='splitHeading'>
                                            DEPLOYED CONTRACT
                                        </div>
                                        <div class='splitBody'>
                                            <div class='splitBody-vert splitBody-vert-info<?php echo $time?> hoverImage' data-value='created'>
                                                <div class='splitBody-vert-img'>
                                                    <img src='assets/history.png' class='hoverImage'>
                                                </div>
                                                <div class='splitBody-vert-amount'>
                                                    Created - 5/23/2022
                                                </div>
                                            </div>
                                            <div class='splitBody-vert splitBody-vert-info<?php echo $time?> hoverImage' data-value='tokens'>
                                                <div class='splitBody-vert-img'>
                                                    <img src='assets/token.png' class='hoverImage'>
                                                </div>
                                                <div class='splitBody-vert-amount'>
                                                   Available - <span id='tokens-minted'>0</span><br>
												   Allocated - <span id='allocated-tokens'>0</span>
                                                </div>
                                            </div>
                                            <div class='splitBody-vert splitBody-vert-info<?php echo $time?> hoverImage' data-value='company'>
                                                <div class='splitBody-vert-img'>
                                                    <img src='assets/company.png' class='hoverImage'>
                                                </div>
                                                <div class='splitBody-vert-amount' id='companiesInContract'>
                                                    Companies<br>
                                                </div>
                                            </div>


                                        </div>
                                    </div><!-- End -->
                                    
                                </div>
                            </div>
                            <div class='control-content-right'>
                                <div class='control-menu-icon'>
                                    <img src='assets/delete.png' class='hoverImage'>
                                </div>
                                <div class='control-menu-icon'>
                                    <img src='assets/cogs.png' class='hoverImage editContract'>
                                </div>
                                <div class='control-menu-icon'>
                                    <img src='assets/share.png' class='hoverImage'>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div><!-- control-->

            <h1 class='AllocationsHeading'>Allocations</h1>
										  
			<div class='allocationsHere' id='allocationsHere'>
										
			</div>
										 
           
        </div>













        <div class='right-side right-side-gov'>
            <div class='right-side-rel right-side-form' style = 'display: none;'>
                <div class='new-contract-bg'>
                    <img src='assets/newcontractbg.png'>
                </div>


                <div class='new-contract-cont-abs'>
                <div class='wrap-new-contract-rel'>

                <div class='wrap-new-contract'>
                    <div class='wrap-new-contract-scroll'>
                    <br>

                    <div class='each-login-img'>
                        <img src='assets/smart-contract.png'>
                    </div>
                    <div class='each-login-heading' style='font-size: 25px;'>
                        Execute Contract
                    </div>

                    <div class='each-login-inputs-absolute each-login-inputs-absolute-form'>
                        <span>mint</span><br>
                        <input type='text' placeholder= 'Total Tokens' id='tokens-to-mint'><br>
                        <button id='execute-mint<?php echo $time?>'>mint()</button><br><br>
                        <span>addCorporation</span><br>
                        <select class='available-companies' id='available-companies<?php echo $time?>'>
                        <option>Select</option>
                        <option>Add All Companies</option>
                        <option>Ford</option>
                        <option>Tesla</option>
                        <option>GM</option>
                        <option>Toyota</option>
                        <option>Mercedes</option>
                        <option>Honda</option>
                        </select>
                    <div class='selected-companies'>

                    </div>
                    <button id='execute-addCorporation<?php echo $time?>'>addCorporation()</button><br><br>
                    <span>allocate</span><br>
                       
                        <button id='execute-allocate<?php echo $time?>'>allocate()</button><br><br>

                    <br>
                    <div class='form-footer'>
                        <span>Click execute next to each corresponding input to execute relevant function</span>
                    </div>


                </div>
                </div>

            </div>
        </div>



    </div>

















</div>


<script>
											
    let time = <?php echo $time?>;


	//OBJECTS
	let token_co2_userObj = localStorage.getItem("token_co2_userObj");
	token_co2_userObj = JSON.parse(token_co2_userObj);
	let contractObj = localStorage.getItem("contractObj");
	contractObj = JSON.parse(contractObj);
	let accountsObj = localStorage.getItem("accountsObj");		
	accountsObj = JSON.parse(accountsObj);	
	

	//SET CONTRACT					
	$("#tokens-minted").html(accountsObj.UST.tokens);
	$("#allocated-tokens").html(accountsObj.UST.allocated);
	let companiesInContract = contractObj.Companies;
	for (let i = 0; i < companiesInContract.length; i++) 
	{
		$("#companiesInContract").append("<button>"+companiesInContract[i]+"</button>");
	}
	
	
	
	
	
											
											
	//UPDATE MINTED TOKENS 
	$("#execute-mint<?php echo $time?>").on("click", function()
	{
											
		//check already minted
			let alreadyMinted = accountsObj.UST.tokens;
											
		
											
			let total = parseInt($("#tokens-to-mint").val());
			if(total == 0 || total == "" || total == "NaN")
			{
				return;
			}
			accountsObj.UST.tokens = total;
			localStorage.setItem("accountsObj", JSON.stringify(accountsObj));
			$("#tokens-minted").html(total);
		
	});
											
	//Allocate TOKENS
	$("#execute-allocate<?php echo $time?>").on("click", function()
	{
		
		let available = accountsObj.UST.tokens;
		if(available > 0 )
		{
			fifthOfTokens = available / 5;	
											
			accountsObj.UST.tokens = 0;
			accountsObj.UST.allocated = available;
											
			accountsObj.Tesla.tokens = fifthOfTokens;													
			accountsObj.Mercedes.tokens = fifthOfTokens;
			accountsObj.Ford.tokens = fifthOfTokens;
			accountsObj.Honda.tokens = fifthOfTokens;
			accountsObj.Volkswagon.tokens = fifthOfTokens;
											
			localStorage.setItem('accountsObj', JSON.stringify(accountsObj));
			
			$("#tokens-minted").html("0");
			$("#allocated-tokens").html(accountsObj.UST.allocated);
											  
			showAllocations();
											
		}
		else
		{
			showAllocations();
		}
		
												
	});
	
											






	






    //FUNCTION
	function showAllocations()
	{
				$("#allocationsHere").empty();
											  
											  
		for (var key in accountsObj) 
		{
    		if (accountsObj.hasOwnProperty(key)) 
			{
        		
											  
					let thisAccount = accountsObj[key];
					if(key !== "UST")
					{
						$("#allocationsHere").append("<div class='allocationDiv'><img src='assets/"+thisAccount.logo+".png' class='hoverImage' style='width: 70px;'><br><span>"+thisAccount.name+"</span><br><br><img src='assets/history.png' class='hoverImage'><br><span>Allocated - Now</span><br><br><img src='assets/token.png' class='hoverImage'><br><span>Tokens - "+thisAccount.tokens+"</span></div>");
						$(".allocationDiv").fadeIn(5000);
					}
											  
											  
    		}
		}									  
				
											  
											  
											  
	}
											  
											  
											  
											  
											  

	if(token_co2_userObj.type !== "gov")
	{
		
		$(".control-content-right").remove();
		showAllocations();
		$(".right-side").remove();
		$(".left-side").css("width", "100%");
		
	}
	else
	{
		console.log(accountsObj.UST.allocated > 0)
		{
			showAllocations();
		}
	}




	$("#entityLoggedIn").html("- Welcome " + token_co2_userObj.entity);

    $(".wrap-window"+time).animate({"left":"0px"}, "slow");
</script>