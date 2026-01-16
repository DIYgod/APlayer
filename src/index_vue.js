import { createApp } from 'vue';
import MusicPlayer from '../GlassMusicPlayer/MusicPlayer.vue';

class APlayer {
    constructor(options) {
        this.options = options || {};
        this.container = this.options.container;

        if (!this.container) {
            console.error('APlayer: container option is required');
            return;
        }

        // Create Vue app
        this.app = createApp(MusicPlayer);

        // Mount the app to the container
        this.app.mount(this.container);
    }

    destroy() {
        if (this.app) {
            this.app.unmount();
        }
    }
}

export default APlayer;
