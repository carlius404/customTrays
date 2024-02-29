import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/addons/controls/DragControls.js';
import {GUI} from "dat.gui"

export default class ThreeScene{
    constructor(canvasId,drag,orbit,ortographic,dimGui){
        this.drag=drag
        this.orbit=orbit
        this.ortographic=ortographic
        this.canvasId = canvasId
        this.dimGui=dimGui

        this.selectedColor="#673AB7"
        this.cellColor="#546E7A"
        this.cells=[]
        this.onClick = this.onClick.bind(this)
        this.dragStartCallback=this.dragStartCallback.bind(this)
        this.tray=null
    }

    init(){
        this.scene = new THREE.Scene();
        if(this.ortographic){
            this.camera=new THREE.OrthographicCamera(-40,40,40,-40,1,1000)
        }else{
            this.camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                1,
                1000
              );
        }
        this.camera.position.z = 48;
        
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({canvas});

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        if(this.orbit){
            this.orbCntrls = new OrbitControls(this.camera, this.renderer.domElement)
          }

        if(this.drag){
            var dragCntrls = new DragControls(this.cells,this.camera, this.renderer.domElement)
            dragCntrls.addEventListener("dragstart",this.dragStartCallback)
        }
        if(this.dimGui){
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.gui = new GUI();
            window.addEventListener('click', this.onClick);
        }
        
    }

    dragStartCallback(event){
        event.object.material.color.set(this.selectedColor)
    }
      
    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        if(this.orbit){
          this.orbCntrls.update();
        }
      }
    
    render() {
    this.renderer.render(this.scene, this.camera);
    }

    createObj(geom){
        if(geom=="box"){
			console.log("box")
			var obj=new THREE.Mesh(
				new THREE.BoxGeometry(16, 16, 16),
				new THREE.MeshBasicMaterial({color: "#546E7A"}),
			  );
		}

		if(geom=="cylinder"){
			var obj=new THREE.Mesh(
				new THREE.CylinderGeometry(5, 5, 20, 32), //radiustop,radiusbottom,height,radialsegments,
				new THREE.MeshBasicMaterial({color: "#546E7A"}),
			  );
		}

		if(geom=="sphere"){
			var obj=new THREE.Mesh(
				new THREE.SphereGeometry(15, 32, 16), //radius, widthsegments,heightsegments
				new THREE.MeshBasicMaterial({color: "#546E7A"}),
			  );
		}

		if(geom=="cone"){
			var obj=new THREE.Mesh(
				new THREE.ConeGeometry(5, 20, 32), //radius,height,radiusSegments
				new THREE.MeshBasicMaterial({color: "#546E7A"}),
			  );
		}

		if(geom=="ring"){
			var obj=new THREE.Mesh(
				new THREE.RingGeometry(1, 5, 32), //innerradius,outerRadius,thetaSegments
				new THREE.MeshBasicMaterial({color: "#546E7A"}),
			  );
		}
        if(geom=="polygon"){
			var obj=new THREE.Mesh(
				new THREE.CylinderGeometry(5, 5, 20, 3), //radiustop,radiusbottom,height,radialsegments,
				new THREE.MeshBasicMaterial({color: "#546E7A"}),
			  );
		}

        return obj
    }

    addCell(geom){
        const obj=this.createObj(geom)
        this.scene.add(obj)
        this.cells.push(obj)
    }

    setTray(geom){
        if(this.tray!=null){
            this.scene.remove(this.tray)
        }
        this.tray=this.createObj(geom)
        this.scene.add(this.tray)
        this.cells.push(this.tray)
    }

    onClick(event) {
        if(this.dimGui){
            event.preventDefault()
            // Calcola la posizione del mouse
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Effettua il raycasting
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.cells);

            // Se un cubo è stato cliccato, mostra i controlli di dat.gui per modificare le dimensioni
            
            if (intersects.length > 0) {
                const numberOfFolders = Object.keys(this.gui.__folders).length;
                if(numberOfFolders==1){
                    this.gui.removeFolder(this.folder)
                }
                const selectedObj = intersects[0].object;
                this.folder= this.gui.addFolder('');
                this.folder.add(selectedObj.scale, 'x', 0.1, 2).name('Larghezza');
                this.folder.add(selectedObj.scale, 'y', 0.1, 2).name('Altezza');
                this.folder.add(selectedObj.scale, 'z', 0.1, 2).name('Profondità');
                this.folder.open();
            }
        }
    }

}