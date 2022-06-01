<?php

    $time = time();

?>

<div class='wrap-window wrap-window<?php echo $time?>'>
    <div class='background'>
        <img src='assets/newcontractbg.png'>
    </div>

    <div class='wrap-new-contract-rel'>

        <div class='wrap-new-contract'>
            <div class='wrap-new-contract-scroll'>


                <div class='each-login-img'>
                    <img src='assets/smart-contract.png'>
                </div>
        <div class='each-login-heading'>
            New Contract
        </div>

        <div class='each-login-inputs-absolute each-login-inputs-absolute-form'>
            <span>Name</span><br>
            <input type='text' placeholder= 'Name'>
            <span>Total Tokens</span><br>
            <input type='text' placeholder= 'Total Tokens'>
            <span>Add Company</span><br>
            <select class='available-companies' id='available-companies<?php echo $time?>'>
                <option>Select</option>
                <option>Add All Companies</option>
                <option>Ford</option>
                <option>Tesla</option>
                <option>GM</option>
                <option>Toyota</option>
                <option>Meredes</option>
                <option>Bmw</option>
                <option>Volvo</option>
                <option>Honda</option>
            </select>
        <div class='selected-companies'>

        </div>
        <div class='form-buttons'>
            <button class='fiveeb2a2'>Create</button>
            <button class='transparentButton colorRed nvm' id='nvm<?php echo $time?>' data-windowtoclose = 'wrap-window<?php echo $time?>'>Nevermind</button>
        </div>


        <div class='form-footer'>
            <span>Once your contract has been created, you will be able to view it in your dashboard and execute the transaction</span>
        </div>


    </div>






        </div>
    </div>





</div>
       

  








</div>








</div>


<script>
    let time = <?php echo $time?>;

    $("#available-companies<?php echo $time?>").on("change", function()
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


    $(".wrap-window"+time).css("left", "0px");
</script>




<style>
    .wrap-new-contract-rel
    {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: transparent;
        z-index: 1;
        
    }
    .wrap-new-contract
    {
        width: 60%;
        height: 94%;
        top: 3%;
        left: 20%;
        background-color: grey;
        position: absolute;
        background-color: #fffed6;
        overflow-y: auto;
        padding-top: 40px;
        box-shadow: 2px 0px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 2px 0px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 2px 0px 5px 0px rgba(0,0,0,0.75);
        border-radius: 10px;
    }
    .wrap-new-contract-scroll
    {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .each-login-inputs-rel-form
    {
        height: 400px;
    }
    .form-buttons
    {
        width: 100%;
        height: auto;
        text-align: center;
        margin-top: 10px;
    }
    .form-buttons button
    {
        width: 100px;
    }
    .form-footer
    {
        width: 60%%;
        height: auto;
        text-align: center;
        margin-top: 20px;
    }
    @media only screen and (max-width: 1000px)
    {
        .wrap-new-contract
        {
            width: 100%;
            left: 0%;
        }
    }




</style>

