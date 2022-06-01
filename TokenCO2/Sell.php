<?php

$time = time();
$userType = 'gov';

?>

<div class='wrap-window wrap-window<?php echo $time?>'>
    <div class='menu'>
        <input type='text' placeholder = 'Search'><img src='assets/redx.png' class='hoverImage'>
     
    </div>
   


    <div class='fiftyWindow'>
        
        <div class='left-side' style='width: 100%;'>
            
			<div class='myContract'>
				<h1>Sell Tokens</h1>
				<div class='my-contract-content'>
					<h2>Your Contract</h2>
					<img src='' class='hoverImage my-contract-img' id='my-contract-img' style='width: 70px;'><br>
					<span class='my-contract-name' id='my-contract-name'></span><br><br>
					<img src='assets/token.png' class='hoverImage my-contract-img' style='width: 70px;'><br>
					<span class='my-contract-it'>Initial Tokens Allocated - 400</span><br>
					<span class='my-contract-afs' id='my-contract-afs'>available for sale - 400</span><br><br>
					<img src='assets/market.png' class='hoverImage my-contract-img' style='width: 70px;'><br>
					<span class='my-contract-con' id='my-contract-con'>Currently on market - 0</span><br><br><br>
			
					<div class='sellOptions'>
						Sell options<br>
						<input type='text' id='hmts' placeholder='How many to sell'>@
						<input type='text' id='cpt' placeholder='Cost per token (Ether)'><br>
						<button id='executeSell<?php echo $time?>'>executeSell()</button>
					</div>
				</div>
			</div>
		
            
           
        </div>


        <div class='right-side right-side-buy' style='width:0%;'>
            
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
	
	
	
	
	

	$("#my-contract-img").attr("src", "assets/"+token_co2_userObj.logo+".png");
	$("#my-contract-name").html(token_co2_userObj.entity);
	let availableForSale = accountsObj[token_co2_userObj.entity].tokens - accountsObj[token_co2_userObj.entity].forSale;
	$("#my-contract-afs").html("Available for sale - "+availableForSale);
	$("#my-contract-con").html("Currently on the market - "+ accountsObj[token_co2_userObj.entity].forSale)
	
	
	
	

	
	
	
	//EXECUTE SELL
	$("#executeSell<?php echo $time?>").on("click", function()
	{
		
		//CHECK ALREADY SELLING
		let onsale = accountsObj[token_co2_userObj.entity].forSale;
		if(onsale >0)
		{
			alert("Your are already selling!");
			return;
		}
		
		let hmts = parseInt($("#hmts").val());
		let cpt = parseInt($("#cpt").val());
		
		contractObj.sellers.push(token_co2_userObj.entity);
		localStorage.setItem('contractObj', JSON.stringify(contractObj));
		accountsObj[token_co2_userObj.entity].forSale = hmts;
		accountsObj[token_co2_userObj.entity].price = cpt;
		
		localStorage.setItem('accountsObj', JSON.stringify(accountsObj));
		
		let availableForSale = accountsObj[token_co2_userObj.entity].tokens - accountsObj[token_co2_userObj.entity].forSale;
		$("#my-contract-afs").html("Available for sale - "+availableForSale);
		$("#my-contract-con").html("Currently on the market - "+ hmts);
		
	});













    $(".wrap-window"+time).animate({"left":"0px"}, "slow");
</script>