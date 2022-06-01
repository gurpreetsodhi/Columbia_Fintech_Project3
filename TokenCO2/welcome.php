<?php

$time = time();

?>

<div class='wrap-window wrap-window<?php echo $time?>'>
    <div class='wrap-window-rel'>

        <div class='wrap-each-login'>

            <div class='each-login each-login-right'>
                <div class='fifty-top'>

                    <div class='each-login-img'>
                        <img src='assets/gov.png'>
                    </div>
                    <div class='each-login-heading'>
                        <span style='font-weight: bold;'>Government Login</span><br>
                        For ease of testing, all accounts are provided to you
                    </div>
                    

                    <div class='each-login-inputs-rel'>
                        <div class='each-login-inputs-absolute'>

                            <select id='select-gov-account'>
                                <option>US TREASURY</option>
                            </select>
                          



                        </div>
                    </div>
                    <br><br>

                    <div class='each-login-buttons'>
                        <button class='login login-ust hoverImage' id='login-ust<?php echo $time?>'>Login</button>
                        <button class='forgotPass hoverImage'>Forgot Password</button>
                    </div>

                    
                </div>
                
            </div>



















            <div class='each-login each-login-right'>
                <div class='fifty-top'>

                    <div class='each-login-img'>
                        <img src='assets/company.png'>
                    </div>
                    <div class='each-login-heading'>
                        <span style='font-weight: bold;'>Company Login</span><br>
                        For ease of testing, all accounts are provided to you
                    </div>

                    <div class='each-login-inputs-rel'>
                        <div class='each-login-inputs-absolute'>


                            <select id='select-comp-account'>
                                <option>Tesla</option>
                                <option>Mercedes</option>
                                <option>Ford</option>
                                <option>Honda</option>
                                <option>Volkswagon</option>
                            </select>
                            



                        </div>
                    </div>
                        <br><br>

                    <div class='each-login-buttons'>
                        <button class='login login-comp hoverImage'>Login</button>
                        <button class='forgotPass hoverImage'>Forgot Password</button>
                    </div>

                    
                </div>
                
            </div>










        </div>

    </div>
</div>


<script>
    let time = <?php echo $time?>;


    $(".wrap-window"+time).animate({"left":"0px"}, "slow");
</script>