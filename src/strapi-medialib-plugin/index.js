import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from './icons/strapi-medialib.svg';


export class StrapiMediaLib extends Plugin {

    static get pluginName() {
        return 'strapiMediaLib'
    }

    init() {
        const editor = this.editor;
        const config = editor.config.get('strapiMediaLib');

        editor.ui.componentFactory.add('strapiMediaLib', locale => {
            
            const view = new ButtonView(locale);

            view.set({
                label: (config && config.label) ? config.label : "Media Library",
                icon: imageIcon,
                tooltip: true
            });

            view.on('execute', () => {
                if (config && config.onToggle) {
                    config.onToggle(editor);
                }
                else {
                    alert('Properly integrate editor into Strapi to make button work');
                };
            });

            return view;
        });
    }
}
