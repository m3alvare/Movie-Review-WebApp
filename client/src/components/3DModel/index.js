import React, { Component} from 'react';
import * as THREE from 'three';
import { AmbientLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import Model from '../../3DRender';


// const hlight = new AmbientLight(0x404040,100)

class ThreeModel extends Component {

    // scene.background = new THREE.Color(0xdddddd)
    
    // scene.add(hlight)

    // renderer.setSize(window.innerWidth/window.innerHeight)

    // loader.load('scene.gltf', function(gltf){
    //     scene.add(gltf.scene)
    //     renderer.render(scene,camera)
    // })

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.scene = new THREE.Scene()
        
        //set Renderer
        this.renderer = new THREE.WebGLRenderer({antialias:true})
        this.renderer.setClearColor("#263238");
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
    
        //position Camera
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        this.camera.position.z = 20;
        this.camera.position.y = 5;
    
        //Camera Controls
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
    
        //LIGHTS
        var lights = [];
        lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
    
        //use loader
        const loader = new GLTFLoader()
        // loader.setBaseUrl("../../3DRender/");
        loader.load('/client/scr/3DRender/scene.gltf', function(gltf){
            let movieProjector = gltf.scene.children[0]
            movieProjector.scale.set(0.5,0.5,0.5)
            this.scene.add(gltf.scene)
        });
    
        this.renderScene();
        //start animation
        this.start();
      }

    //   addModel() {
        
    //   }
    
      componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
      }
      start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate);
        }
      };
      stop = () => {
        cancelAnimationFrame(this.frameId);
      };
      animate = () => {
        // -----Step 3--------
        //Rotate Models
        if (this.cube) this.cube.rotation.y += 0.01;
        if (this.freedomMesh) this.freedomMesh.rotation.y += 0.01;
    
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
      };
      renderScene = () => {
        if (this.renderer) this.renderer.render(this.scene, this.camera);
      };

      render() {
        return (
          <div
            style={{ width: "1500px", height: "800px" }}
            // align = 'center'
            ref={(mount) => {
              this.mount = mount;
            }}
          />
        );
      }
}

export default ThreeModel
