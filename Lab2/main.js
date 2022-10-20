const slider = (el = null, options = {}) => {

    class SliderOptions{
        constructor(options){
            this.delay = 0;
            this.speed = 5000;
            this.transition = 600;
            this.pagination = true;
            this.navigation = true;

            for(const k in options){
                this[k] = options[k];
            }
        }
    }
    
    const $ = {
        VARS: {
            slider: null,
            options: {},
        },
    
        init: function() {
            if (el === null) {
                console.error("Please select an element for slider");
                return;
            }
            $.VARS.slider = document.querySelector(`${el}`);
            $.VARS.options = new SliderOptions(options);
    
            console.log($);
        },
        create: function() {
            const slider = document.createElement("<div>")
        }
    }
    

    $.init(el, options)
}
slider(".slider", {navigation: false})
