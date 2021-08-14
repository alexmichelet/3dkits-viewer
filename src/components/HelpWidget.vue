<template>
    <div id="help-widget">
        <a href="#"><div id="help">?</div></a>
        <div id="help-modal"></div>
    </div>
</template>

<script>
export default {
  name: 'HelpWidget'
}
</script>

<style>
#help{
    position: absolute;
    right: 30px;
    bottom: 30px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #007EC1;
    color: white;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 30px;
    -webkit-transition: all 80ms ease-out;
    -moz-transition: all 80ms ease-out;
    -o-transition: all 80ms ease-out;
    transition: all 80ms ease-out;
}

#help:hover{
    background-color: #2ba1e0;
}

#help-modal{
    padding: 10px;
}
</style>