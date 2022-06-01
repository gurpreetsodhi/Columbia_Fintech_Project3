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
            
            <div class='control-pending-contract' style='height: 100%;'><!-- CONTROL-->
                <div class='control-relative'>
                    <div class='control-bg'>
                        <img src='assets/contactbackgroundone.jpg'>
                    </div>
                    <div class='control-content'>
                        <div class='control-content-rel control-content-rel<?php echo $time?>'>
                            <div class='control-content-left control-content-left<?php echo $time?>''>
                                <div class='control-left-flex'>
                                    <div class='contractDetails contractDetails<?php echo $time?>'><!--Start-->
                                        <div class='splitHeading'>
                                            Details
                                        </div>
                                        <div class='splitBody'>
                                        <div class='splitBody-vert splitBody-vert-info<?php echo $time?> hoverImage' data-value='company'>
                                                <div class='splitBody-vert-img'>
                                                    <img src='assets/teslalogo.png' class='hoverImage'>
                                                </div>
                                                <div class='splitBody-vert-amount'>
                                                    Company - Tesla
                                                </div>
                                            </div>
                                            <div class='splitBody-vert splitBody-vert-info<?php echo $time?> hoverImage' data-value='created'>
                                                <div class='splitBody-vert-img'>
                                                    <img src='assets/history.png' class='hoverImage'>
                                                </div>
                                                <div class='splitBody-vert-amount'>
                                                    Received - 5/23/2022
                                                </div>
                                            </div>
                                            <div class='splitBody-vert splitBody-vert-info<?php echo $time?> hoverImage' data-value='tokens'>
                                                <div class='splitBody-vert-img'>
                                                    <img src='assets/token.png' class='hoverImage'>
                                                </div>
                                                <div class='splitBody-vert-amount'>
                                                   Tokens - 20
                                                </div>
                                            </div>
                                            


                                        </div>
                                    </div><!-- End -->
                                    <div class='contractDetails'>
                                        <div class='splitHeading'>
                                            History
                                        </div>
                                        <div class='splitBody'>
                                            <div class='contract-history'>

                                                <div class='each-cont-history'><!--CONTROL-->
                                                    <div class='each-cont-history-body'>
                                                        <div class='each-cont-history-left'>
                                                            <img src='assets/allocated.png' class='hoverImage'>
                                                        </div>
                                                        <div class='each-cont-history-right'>
                                                            Tokens have been allocated
                                                            <div class='note-date'>5/22/2022</div>
                                                        </div>
                                                    </div>
                                                    <div class='each-cont-history-buttons'>
                                                        <button>button</button><button>button</button>
                                                    </div>
                                                </div><!-- control -->
                                                <div class='each-cont-history'><!--CONTROL-->
                                                    <div class='each-cont-history-body'>
                                                        <div class='each-cont-history-left'>
                                                            <img src='assets/posted.png' class='hoverImage'>
                                                        </div>
                                                        <div class='each-cont-history-right'>
                                                            Contract was created on - Now
                                                            <div class='note-date'>5/22/2022</div>
                                                        </div>
                                                    </div>
                                                    <div class='each-cont-history-buttons'>
                                                        <button>Hide</button><button>Delete</button>
                                                    </div>
                                                </div><!-- control -->
                                                






                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='control-content-right'>
                                <div class='control-menu-icon'>
                                    <img src='assets/return.png' class='hoverImage'>
                                </div>
                                <div class='control-menu-icon'>
                                    <img src='assets/cogs.png' class='hoverImage'>
                                </div>
                                <div class='control-menu-icon'>
                                    <img src='assets/sell.png' class='hoverImage'>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div><!-- control-->

            
           
        </div>













   



    </div>

















</div>


<script>
    let time = <?php echo $time?>;


















    $(".wrap-window"+time).animate({"left":"0px"}, "slow");
</script>