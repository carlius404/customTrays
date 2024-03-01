import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/addons/controls/DragControls.js';
import {GUI} from "dat.gui"
import { create } from 'domain';

export default class ThreeScene{
    constructor(canvasId,drag,orbit,ortographic,dimGui,maxDim){
        this.drag=drag
        this.orbit=orbit
        this.ortographic=ortographic
        this.canvasId = canvasId
        this.dimGui=dimGui
        this.maxDim=maxDim

        this.selectedObj=null
        this.beforeColor=null
        this.cellColor="#546E7A"
        this.cells=[]
        this.onClick = this.onClick.bind(this)
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
        }
        if(this.dimGui){
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.gui = new GUI();
            window.addEventListener('click', this.onClick);
        }
        
    }

    createFolder(obj){
        var folder
        if(obj.geometry instanceof THREE.BoxGeometry){
            folder=this.gui.addFolder('Box');
            folder.add(obj.scale, 'x', obj.geometry.scale.x, this.maxDim).name('Width');
            folder.add(obj.scale, 'y', obj.geometry.scale.y, this.maxDim).name('Height');
            return folder
        }
        
        if(obj.geometry instanceof THREE.CylinderGeometry){
            folder=this.gui.addFolder('Cylinder');
            folder.add(obj.scale, 'radiusTop', 0.1, this.maxDim).name('radius top');
            folder.add(obj.scale, 'radiusBottom', 0.1, this.maxDim).name('radius bottom');
            return folder
        }

        if(obj.geometry instanceof THREE.SphereGeometry){
            folder=this.gui.addFolder('Sphere');
            folder.add(obj.scale, 'radius', 0.1, this.maxDim).name('radius');
            return folder
        }

        if(obj.geometry instanceof THREE.ConeGeometry){
            folder=this.gui.addFolder('Cone');
            folder.add(obj.scale, 'radius', 0.1, this.maxDim).name('radius');
            return folder
        }

        if(obj.geometry instanceof THREE.RingGeometry){
            folder=this.gui.addFolder('Ring');
            folder.add(obj.scale, 'innerRadius', 0.1, this.maxDim).name('inner radius');
            folder.add(obj.scale, 'outerRadius', 0.1, this.maxDim).name('outer radius');
            return folder
        }
        
    }

    createObj(geom,dim,color){
        const mesh=new THREE.MeshBasicMaterial({color: color, side:THREE.BackSide})

        if(geom=="box"){
			var obj=new THREE.Mesh(
				new THREE.BoxGeometry(dim, dim, dim),
				mesh,
			  );
		}

		if(geom=="cylinder"){
			var obj=new THREE.Mesh(
				new THREE.CylinderGeometry(dim, dim, 20, 32), //radiustop,radiusbottom,height,radialsegments,
				mesh,
			  );
            
		}

		if(geom=="sphere"){
			var obj=new THREE.Mesh(
				new THREE.SphereGeometry(dim, 32, 32), //radius, widthsegments,heightsegments
				mesh,
			  );
		}

		if(geom=="cone"){
			var obj=new THREE.Mesh(
				new THREE.ConeGeometry(dim, 20, 32), //radius,height,radiusSegments
				mesh,
			  );
		}

		if(geom=="ring"){
			var obj=new THREE.Mesh(
				new THREE.RingGeometry(dim-dim/2, dim, 32), //innerradius,outerRadius,thetaSegments
				mesh,
			  );
		}
        if(geom=="polygon"){
			var obj=new THREE.Mesh(
				new THREE.CylinderGeometry(dim, dim, 20, 3), //radiustop,radiusbottom,height,radialsegments,
				mesh,
			  );
		}

        return obj
    }

    addCell(geom,dim){
        const obj=this.createObj(geom,dim,"#334155")
        this.scene.add(obj)
        this.cells.push(obj)
    }

    setTray(geom,dim){
        if(this.tray!=null){
            this.scene.remove(this.tray)
        }
        this.tray=this.createObj(geom,dim,"#475569")
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
                if(this.selectedObj!=selectedObj){
                    this.beforeColor=selectedObj.material.color.getHexString()
                    selectedObj.material.color.set("#4338ca")
                    this.selectedObj=selectedObj

                    this.folder= this.createFolder(selectedObj)
                    this.folder.open();
                }else{
                    console.log(this.beforeColor)
                    selectedObj.material.color.set("#"+this.beforeColor)
                    this.selectedObj=null
                }
                
                
            }
        }
    }

}