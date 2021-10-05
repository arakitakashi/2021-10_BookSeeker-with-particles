import * as THREE from "three"
import Stats from 'three/examples/jsm/libs/stats.module'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import config from '../plugins/config'
import RAF from '../plugins/RAF'

import BookSeeker from './BookSeeker'
import ParticleEmitter from './ParticleEmitter'
import TimerModel from './TimerModel';

class MainThreeScene {
    constructor() {
        this.bind()
        this.clock = new THREE.Clock()
    }

    init(container) {
        // RENDERER SETUP
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        this.renderer.outputEncoding = THREE.sRGBEncoding
        container.appendChild(this.renderer.domElement)

        // MAIN SCENE INSTANCE
        this.scene = new THREE.Scene()

        // Stats
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)

        // CAMERA AND ORBIT CONTROLLER
        this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, -100)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enabled = config.controls
        this.controls.maxDistance = 1500
        this.controls.minDistance = 0

        // SET GUI

        // SET LIGHTS
        const light = new THREE.DirectionalLight( 0xffaa33 );
        light.position.set( - 10, 10, 10 );
        light.intensity = 1.0;
        this.scene.add( light );

        const light2 = new THREE.AmbientLight( 0x003973 );
        light2.intensity = 1.0;
        this.scene.add( light2 );


        // RENDER LOOP AND WINDOW SIZE UPDATER SETUP
        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)

        // SET BOOK SEEKER
        this.bookSeeker = new BookSeeker(this.scene)
        this.bookSeeker.init()

        // SET PARTICLE EMITTER
        this.particleEmitter = new ParticleEmitter(this.scene)
        this.scene.add(this.particleEmitter)

        this.timerModel = new TimerModel()
    }

    update() {
      this.stats.begin()
        this.renderer.render(this.scene, this.camera)
      this.stats.end()
        this.bookSeeker.update()
        this.particleEmitter.update()
        this.timerModel.updateTimeRatio()
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new MainThreeScene()
export default _instance