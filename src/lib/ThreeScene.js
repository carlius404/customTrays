import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/addons/controls/DragControls.js';
import {GUI} from "dat.gui"

export default class ThreeScene{
    constructor(canvasref,drag,orbit,dimGui,light,maxDim){
        this.drag=drag
        this.orbit=orbit
        this.canvasref = canvasref
        this.dimGui=dimGui
        this.maxDim=maxDim
        this.light=light

        this.selectedObj=null
        this.beforeColor=null
        this.cellColor="#546E7A"
        this.onDragStart = this.onDragStart.bind(this)
        this.onWindowResize= this.onWindowResize.bind(this)
        this.tray=null
        this.trayThickness=null
    }

    init(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/2/ window.innerHeight, 0.1, 1000)

        this.camera.position.z=90;

        
        
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
        }
        
    }

    onDragStart(event){
        const numberOfFolders = Object.keys(this.gui.__folders).length
        if(numberOfFolders>=1 && this.selectedObj!=event.object){
            this.gui.removeFolder(this.folder)
        }
        if(this.selectedObj!=event.object){
            
            if(this.selectedObj!=null){
                this.scene.children.map((obj)=>{if(obj==this.selectedObj){obj.material.color.set("#"+this.beforeColor)}})
            }
            
            this.beforeColor=event.object.material.color.getHexString()
            this.selectedObj=event.object
            event.object.material.color.set("#4338ca")
            if(this.selectedObj.name!='tray'){
                this.folder= this.createFolder(this.selectedObj)
                this.folder.open()
            }
            
            
        }

    }

    removeObjByName(name){
        this.scene.children.map((obj)=>{
            if(obj.name!=name){
                return obj
            }
        })
    }

    
    onWindowResize() {
        this.camera.aspect = window.innerWidth /2/ window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth/2, window.innerHeight );

    }

    removeObj(obj){
        
    }

    setCellPosition(obj,cellDepth){

        obj.position.z=this.trayThickness/2-cellDepth/2
        if(obj.geometry instanceof THREE.SphereGeometry){
            obj.position.z=this.trayThickness/2
        }
    }
    
    createFolder(obj){
        console.log(obj)
        var folder=this.gui.addFolder('');

        //box geometry
        if(obj.geometry instanceof THREE.BoxGeometry){
            var controllers={width:obj.geometry.parameters.width, height:obj.geometry.parameters.height, depth:obj.geometry.parameters.depth}
            folder.add(controllers, 'width', 0, this.maxDim).name('Width').onChange(
                function(){
                    obj.geometry.dispose()
                    obj.geometry=new THREE.BoxGeometry(this.getValue(), controllers.height, controllers.depth)
    
                })
            folder.add(controllers, 'height', 0, this.maxDim).name('Height').onChange(
                function(){
                    obj.geometry.dispose()
                    obj.geometry=new THREE.BoxGeometry(controllers.width, this.getValue(), controllers.depth)
    
                })
            folder.add(controllers, 'depth', 0, this.maxDim).name('Depth').onChange(
                function(){
                    obj.geometry.dispose()
                    obj.geometry=new THREE.BoxGeometry(controllers.width, controllers.height, this.getValue())
                }).onFinishChange(
                    (value)=>{
                        this.setCellPosition(obj,value)
                    }
                )
            return folder
        }

        //sphere geometry
        if(obj.geometry instanceof THREE.SphereGeometry){
            var controllers={radius:obj.geometry.parameters.radius}
            folder.add(controllers, 'radius', 0, this.maxDim).name('Radius').onChange(
                function(){
                    obj.geometry.dispose()
                    obj.geometry=new THREE.SphereGeometry(this.getValue(), 32, 32,undefined,undefined,undefined,Math.PI/2)
                        
                }).onFinishChange(
                    (value)=>{
                        this.setCellPosition(obj,value)
                    }
                )
   
            return folder
        }

        //cylinder geometry
        if(obj.geometry instanceof THREE.CylinderGeometry){
            console.log
            var controllers={radiusTop:obj.geometry.parameters.radiusTop, radiusBottom:obj.geometry.parameters.radiusBottom, height:obj.geometry.parameters.height, radialSegments:obj.geometry.parameters.radialSegments}
            folder.add(controllers, 'radiusTop', 0, this.maxDim).name('Radius top').onChange(
            function(){
                obj.geometry.dispose()
                obj.geometry=new THREE.CylinderGeometry(this.getValue(), controllers.radiusBottom, controllers.height, controllers.radialSegments)

            }
            )

            folder.add(controllers, 'radiusBottom', 0, this.maxDim).name('Radius bottom').onChange(
                function(){
                    obj.geometry.dispose()
                    obj.geometry=new THREE.CylinderGeometry(controllers.radiusTop,this.getValue(), controllers.height, controllers.radialSegments)
    
                }
                )
            
            folder.add(controllers, 'radialSegments', 0, this.maxDim).name('Radial segments').onChange(
                function(){
                    obj.geometry.dispose()
                    obj.geometry=new THREE.CylinderGeometry(controllers.radiusTop,controllers.radiusBottom, controllers.height, this.getValue())
    
                }
                )
                
            folder.add(controllers, 'height', 0, this.maxDim).name('depth').onChange(
                function(){
                    obj.geometry.dispose()
                    obj.geometry=new THREE.CylinderGeometry(controllers.radiusTop,controllers.radiusBottom, this.getValue(), controllers.radialSegments)
                    
                }).onFinishChange(
                    (value)=>{
                        this.setCellPosition(obj,value)
                    }
                )
            return folder
        }
    }


    createObj(geom,dim,thickness,color){
        const mesh=new THREE.MeshBasicMaterial({color: color})

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
              obj.rotation.x=Math.PI/2
		}

		if(geom=="sphere"){
            mesh.side = THREE.DoubleSide;
			var obj=new THREE.Mesh(
				new THREE.SphereGeometry(thickness, 32, 32,undefined,undefined,undefined,Math.PI/2), //radius, widthsegments,heightsegments
				mesh,
			  );
            obj.rotation.x=3*Math.PI/2
		}

        if(geom=="polygon"){
			var obj=new THREE.Mesh(
				new THREE.CylinderGeometry(dim, dim, thickness, 3), //radiustop,radiusbottom,height,radialsegments,
				mesh,
			  );
              obj.rotation.x=Math.PI/2
		}

        return obj
    }

    addCell(geom,dim,thickness){
        const obj=this.createObj(geom,dim,thickness,"#334155")
        this.setCellPosition(obj,thickness)
        this.scene.add(obj)
    }

    changeTrayShape(geom,thickness){
        var dim
        if(this.tray.geometry instanceof THREE.BoxGeometry){
            dim=Math.max(this.tray.geometry.parameters.width,this.tray.geometry.parameters.height)
        }
        if(this.tray.geometry instanceof THREE.CylinderGeometry){
            dim=this.tray.geometry.parameters.radiusTop
        }

        if(geom=="cylinder" || geom=="polygon"){
            if(geom=='polygon'){
                var vertices=3
            }else{
                var vertices=32
            }
            this.tray.geometry.dispose()
            this.tray.geometry=new THREE.CylinderGeometry(dim, dim, thickness, vertices)
            this.tray.rotation.x=Math.PI/2
        }
        if(geom=="box"){
            this.tray.geometry.dispose()
            this.tray.geometry=new THREE.BoxGeometry(dim, dim, thickness)
            this.tray.rotation.x=0
        }
        console.log('change thick',thickness,this.trayThickness)
        this.tray.position.z-=(thickness-this.trayThickness)/2
    }

    setTray(geom,dim,thickness){
        if(this.tray!=null){
            this.changeTrayShape(geom,thickness)
        }else{
            this.tray=this.createObj(geom,dim,thickness,"#475569")
            this.tray.position.z=0
            this.tray.name='tray'
        }
        this.trayThickness=thickness

        this.scene.add(this.tray)
    }

}