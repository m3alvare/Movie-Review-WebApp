import { render } from 'express/lib/response';
import * as THREE from 'three';
import { AmbientLight } from 'three';
import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader';
// import Model from '../../3DRender';

export default function MovieProjectorModel() {
    
    let scene = new THREE.Scene()
    scene.background = new THREE.Color(0xdddddd)
    
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight)

    let hlight = new AmbientLight(0x404040,100)
    scene.add(hlight)

    let renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setSize(window.innerWidth/window.innerHeight)

    let loader = new GLTFLoader()
    loader.load('scene.gltf', function(gltf){
        scene.add(gltf.scene)
        renderer.render(scene,camera)
    })

    return (
        render(
            scene
        )
    )
}