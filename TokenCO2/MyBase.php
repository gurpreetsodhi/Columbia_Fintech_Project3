<?php

$time = time();

?>

<div class='wrap-window wrap-window<?php echo $time?>'>
































</div>


<script>
    let time = <?php echo $time?>;



    $(".wrap-window"+time).animate({"left":"0px"}, "slow");
</script>