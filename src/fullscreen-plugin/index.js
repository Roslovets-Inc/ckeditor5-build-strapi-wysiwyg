import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageFullBig from './icons/fullscreen-big.svg';
import ImageFullCancel from './icons/fullscreen-cancel.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import './css/style.css';

export default class FullScreen extends Plugin {

    static get pluginName() {
        return 'fullScreen'
    }

    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('fullScreen', locale => {

            const view = new ButtonView(locale);

            let normalButtonState = true; // button tooltip suggests to toggle full screen;

            const updateButtonState = function () {
                if (normalButtonState) {
                    editor.sourceElement.nextElementSibling.removeAttribute('id');
                    document.body.removeAttribute('id');
                    view.set({
                        label: 'Full screen',
                        icon: ImageFullBig,
                        tooltip: true
                    });
                    normalButtonState = false;
                } else {
                    editor.sourceElement.nextElementSibling.setAttribute('id', 'fullscreeneditor');
                    document.body.setAttribute('id', 'fullscreenoverlay');
                    view.set({
                        label: 'Normal view',
                        icon: ImageFullCancel,
                        tooltip: true
                    });
                    normalButtonState = true;
                }
            }

            updateButtonState();

            // Callback executed once the image is clicked
            view.on('execute', updateButtonState);

            return view;
        });
    }
}
