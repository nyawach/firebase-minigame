import _ from 'lodash';

const DEFAULT_EVENT = 'value';

export default {
    methods: {
        setFirebaseSubscription(subscription) {
            _.each(subscription, (listener) => {
                listener.ref.on(listener.event || DEFAULT_EVENT, listener.fn);
            });
        },
        clearFirebaseSubscription(subscription) {
            _.each(subscription, (listener) => {
                listener.ref.off(listener.event || DEFAULT_EVENT, listener.fn);
            });
        },
    },
    watch: {
        firebaseSubscription(newValue, oldValue) {
            this.clearFirebaseSubscription(oldValue);
            this.setFirebaseSubscription(newValue);
        },
    },
    created() {
        this.setFirebaseSubscription(this.firebaseSubscription);
    },
    destroyed() {
        this.clearFirebaseSubscription(this.firebaseSubscription);
    },
};