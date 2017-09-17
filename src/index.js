import 'intersection-observer';

const mixin = {
    props: {
        root: {
            type: String
        },
        rootMargin: {
            type: Number,
            default: 0
        },
        threshold: {
            type: Number,
            default: 0
        },
        once: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            inViewport: false
        };
    },
    mounted() {
        const options = {
            root: document.querySelector(this.root),
            rootMargin: `${this.rootMargin}px`,
            threshold: this.threshold
        }
          
        this.__observer__ = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry == null) {
                return;
            }

            const inViewport = entry.intersectionRatio > 0;
            
            if (!this.inViewport && inViewport) {
                this.$emit('viewport-enter');
            }
    
            this.$emit('viewport-change');
    
            if (this.inViewport && !inViewport) {
                this.$emit('viewport-leave');
            }
    
            this.inViewport = inViewport;
    
            if (this.once) {
                this.dispose();
            }
            
        }, options);

        this.__observer__.observe(this.$el);
    },
    beforeDestroy() {
        this.dispose();
    },
    methods: {
        dispose() {
            this.__observer__.unobserve(this.$el);
        }
    }
};

export default mixin