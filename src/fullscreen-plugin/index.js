import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageFullBig from './icons/fullscreen-big.svg';
import ImageFullCancel from './icons/fullscreen-cancel.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import './css/style.css';

export default class FullScreen extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'fullScreen', locale => {
            const view = new ButtonView( locale );
            let etat = 0; //si 0 position normale
            view.set( {
                label: 'Full Screen',
                icon: ImageFullBig,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                if(etat==1){
                    editor.sourceElement.nextElementSibling.removeAttribute('id');
                    document.body.removeAttribute('id');
                    view.set( {
                        label: 'Full Screen',
                        icon: ImageFullBig,
                        tooltip: true
                    } );
                    etat=0;
                }else{
                    editor.sourceElement.nextElementSibling.setAttribute("id", 'fullscreeneditor');
                    document.body.setAttribute("id", "fullscreenoverlay");
                    view.set( {
                        label: 'Normal Mode',
                        icon: ImageFullCancel,
                        tooltip: true
                    } );
                    etat=1;
                }
            
            } );

            return view;
        } );
    }
}
