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
            
      		

           
        </div>




        <div class='right-side right-side-buy'>
            <div class='right-side-rel right-side-form'  style='display: none;'>
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
                    <div class='each-login-heading' id='buyTokensHeading'>
                        Buy Tokens
                    </div>

                    <div class='each-login-inputs-absolute each-login-inputs-absolute-form'>
						<span>Buy From</span><br>
                        <input type='text' placeholder= 'Tokens from' id='tokens-from' disabled><br>
                        <span>Number of tokens</span><br>
                        <input type='text' placeholder= 'Number of tokens' id='tokens-to-buy' disabled><br>
						<span>Price / token</span><br>
						<input type='text' placeholder= 'Number of tokens' id='tokens-price' disabled><br>
                        <button id='execute-executeBuy<?php echo $time?>'>executeBuy()</button><br><br>
						
						<div class='buyMessage'></div>
                       

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

	
	
	
	
	
	


	
	
	//GET BUYERS
	function getSellers()
	{
		
		let sellers = contractObj.sellers;
		for (var i = 0; i < sellers.length; i++) 
		{
			let rndInt = Math.floor(Math.random() * 1000)
			let thisSeller = sellers[i];
			let logo = accountsObj[thisSeller].logo;
			$(".left-side").append("<div class='myContract'><h3>For Sale</h3><div class='my-contract-sell'><img src='assets/"+logo+".png' class='hoverImage my-contract-img' id='my-contract-img' style='width: 70px;'><br><span class='my-contract-name' id='my-contract-name'>"+accountsObj[thisSeller].name+"</span><br><br><img src='assets/token.png' class='hoverImage my-contract-img' style='width: 70px;'><br><span class='my-contract-it'>For sale - "+accountsObj[thisSeller].forSale+" tokens</span><br><br><img src='assets/price.png' class='hoverImage my-contract-img' style='width: 70px;'><br><span class='my-contract-con' id='my-contract-con'>Price -"+accountsObj[thisSeller].price+" Ether / token</span><br><br><button class='showBuy' id='showBuy"+rndInt+"' data-price='"+accountsObj[thisSeller].price+"' data-seller='"+accountsObj[thisSeller].name+"'>Buy</button> </div></div><hr>");
			
			
			$("#showBuy"+rndInt).on("click", function()
			{

				let seller = $(this).attr("data-seller");
				let price = $(this).attr("data-price");
				$("#tokens-from").val(seller);
				$("#buyTokensHeading").html("Buy tokens from "+seller+"");
				$("#tokens-to-buy").val(accountsObj[thisSeller].forSale);
				$("#tokens-price").val(price);
				$(".right-side-rel").fadeIn();
				
				
				
				
			});
			
		}
		
		
		
	}
	getSellers();
	
	
	
	
	
	
	//EXECUTE BUY
	$("#execute-executeBuy<?php echo $time?>").on("click", function()
	{
	
		let seller = $("#tokens-from").val();
		let totalTokens = parseInt($("#tokens-to-buy").val());
		let price = $("#tokens-price").val();
	
		
		
		
		
		
		
		$("#buyMessage").html("Please wait while we process transaction");
		
		//REMOVE SELLER
		 for( var i = 0; i < contractObj.sellers.length; i++)
		 { 
    
        	if ( contractObj.sellers[i] == seller) 
			{ 
            	contractObj.sellers.splice(i, 1); 
        	}
    
    	 }
		localStorage.setItem('contractObj', JSON.stringify(contractObj));
		
		//SUBTRACT SELLERS SELLING & TOKENS THEY HAVE
		accountsObj[seller].forSale = 0;
		accountsObj[seller].tokens = accountsObj[seller].tokens - totalTokens;
		
		//ADD TO BUYER TOKEN
		accountsObj[token_co2_userObj.entity].tokens = accountsObj[token_co2_userObj.entity].tokens + totalTokens;
		
		localStorage.setItem('accountsObj', JSON.stringify(accountsObj));
		
		
	
	});









    $(".wrap-window"+time).animate({"left":"0px"}, "slow");
</script>