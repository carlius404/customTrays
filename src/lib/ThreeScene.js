import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/addons/controls/DragControls.js';
import {GUI} from "dat.gui"
import { create } from 'domain';

export default class ThreeScene{
    constructor(canvasref,drag,orbit,ortographic,dimGui,maxDim){
        this.drag=drag
        this.orbit=orbit
        this.ortographic=ortographic
        this.canvasref = canvasref
        this.dimGui=dimGui
        this.maxDim=maxDim

        this.selectedObj=null
        this.beforeColor=null
        this.cellColor="#546E7A"
        this.onDragStart = this.onDragStart.bind(this)
        this.onWindowResize= this.onWindowResize.bind(this)
        this.tray=null
    }

    init(){
        this.scene = new THREE.Scene();
        if(this.ortographic){
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.camera = new THREE.OrthographicCamera(
                width / - 2,
                width / 2,
                height / 2,
                height / - 2,
                1,
                1000
            );

        }else{
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/2/ window.innerHeight, 0.1, 1000)
        }
        this.camera.position.z = 90;
        

        this.renderer = new THREE.WebGLRenderer({canvas:this.canvasref.current, antialias:true});
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(window.innerWidth/2, window.innerHeight);
        window.addEventListener( 'resize', this.onWindowResize );
        if(this.orbit){
            this.orbCntrls = new OrbitControls(this.camera, this.renderer.domElement)
          }

        if(this.drag){
           var dragCntrls = new DragControls(this.scene.children,this.camera, this.renderer.domElement)
           dragCntrls.addEventListener( 'dragstart',this.onDragStart);
        }
        if(this.dimGui){
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.gui = new GUI();
            //window.addEventListener('click', this.onClick);
        }
        
    }

    onDragStart(event){
        const numberOfFolders = Object.keys(this.gui.__folders).length
        if(numberOfFolders>=1){
            this.gui.removeFolder(this.folder)
        }
        if(this.selectedObj!=event.object){
            
            if(this.selectedObj!=null){
                this.scene.children.map((obj)=>{if(obj==this.selectedObj){obj.material.color.set("#"+this.beforeColor)}})
            }
            
            this.beforeColor=event.object.material.color.getHexString()
            this.selectedObj=event.object
            event.object.material.color.set("#4338ca")
            this.folder= this.createFolder(this.selectedObj)
            this.folder.open();
            
        }else{
            this.selectedObj=null
            event.object.material.color.set("#"+this.beforeColor)
            this.beforeColor=null
        }
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

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

    createObj(geom,dim,thickness,color){
        const mesh=new THREE.MeshBasicMaterial({color: color, side:THREE.BackSide})

        if(geom=="box"){
			var obj=new THREE.Mesh(
				new THREE.BoxGeometry(dim, dim, thickness),
				mesh,
			  );
		}

		if(geom=="cylinder"){
			var obj=new THREE.Mesh(
				new THREE.CylinderGeometry(dim, dim, thickness, 32), //radiustop,radiusbottom,height,radialsegments,
				mesh,
			  );
            
		}

		if(geom=="sphere"){
			var obj=new THREE.Mesh(
				new THREE.SphereGeometry(thickness, 32, 32), //radius, widthsegments,heightsegments
				mesh,
			  );
		}

		if(geom=="cone"){
			var obj=new THREE.Mesh(
				new THREE.ConeGeometry(dim, thickness, 32), //radius,height,radiusSegments
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
				new THREE.CylinderGeometry(dim, dim, thickness, 3), //radiustop,radiusbottom,height,radialsegments,
				mesh,
			  );
		}

        return obj
    }

    addCell(geom,dim,thickness){
        const obj=this.createObj(geom,dim,thickness,"#334155")
        this.scene.add(obj)
    }

    setTray(geom,dim,thickness){
        if(this.tray!=null){
            this.scene.remove(this.tray)
        }
        this.tray=this.createObj(geom,dim,thickness,"#475569")

        this.scene.add(this.tray)
    }

}