var app = new Vue({
    el: "#app",
    data: {
        time: 25,
        count: 0,
        timerID: null,
        seen: true,
        audio: new Audio("/media/isnt-it.mp3")
    },
    methods: {
        start: function() {
            this.seen = !this.seen;
            this.time = this.time * 60;
            this.timerID = setInterval(() => {
                this.count < this.time ? this.count++ : this.finish();
            }, 1000)
        },
        finish: function() {
            this.audio.play();
            this.reset();
        },
        reset: function() {
            this.seen = !this.seen;
            this.count = 0;
            this.time = 25;
            clearInterval(this.timerID);
        },
    },
    computed: {
        missingTime: function() {
            var missingTime = this.time - this.count;
            var minutes = Math.floor(missingTime / 60);
            var seconds = missingTime - minutes * 60;
            return {minutes: minutes, seconds: seconds};
        },
        percentage: function() {
            return (1 - ((this.time - this.count) / this.time)) * 100;
        }
    }
});