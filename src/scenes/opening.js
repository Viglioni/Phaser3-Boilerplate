import Phaser from 'phaser';
import Constants from '../config/constants';
import * as Assets from "../../assets/";
import Utils from '../utils/utils';

const constants = new Constants();
constants.resize();
const {width, height, assetScale} = constants.getValues();
const center = {
    width: width/2,
    height: height/2
};


export default class Opening extends Phaser.Scene {
    constructor() {
        super({ key: 'opening' });
        this.utils = new Utils(this.sys);
    }

    preload() {
        this.utils.loading();
        Object.keys(Assets).map( name => this.load.image(name, Assets[name]));
    }
    create() {
        let phaser_logo = this.utils.addpic(
            'logo',
            409,
            0,
            {
                z:10,
                callback: ()=>this.utils.show(phaser_logo,300, this.utils.rand(0.2,1))
            }
        );
        this.tweens.add({
            targets: phaser_logo,
            y: height/2,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });
        
    }
    update() {
        let star = this.utils.addpic(
            'star',
            this.utils.randInt(0,1200),
            this.utils.randInt(0,675),
            {z: 1, scale: this.utils.rand(0.5,1)}
        );

        this.utils.wait(this.utils.randInt(100,10000) , () => star.destroy()  );

    }

}
