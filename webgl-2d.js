ig.module(
    'plugins.webgl-2d'
)
.requires(
    'impact.system'
)
.defines(function(){
        
    ig.System.inject({
        
        init: function(canvasId, fps, width, height, scale){
            
            if(document.location.href.match(/force-canvas-2d/)){
                this.parent(canvasId, fps, width, height, scale);
                return;
            }
            
            this.fps = fps;
            this.clock = new ig.Timer();
            this.canvas = ig.$(canvasId);
            this.resize(width, height, scale);
            
            
            
            try {
                WebGL2D.enable(this.canvas);
                this.context = this.canvas.getContext('webgl-2d');
                console.log('WebGL enabled');
            } catch(e) {
                this.context = this.canvas.getContext('2d');
                console.log('WebGL not enabled');
            }
            
            this.getDrawPos = ig.System.drawMode;
            
            // Automatically switch to crisp scaling when using a scale
            // other than 1
            if(this.scale != 1) {
                ig.System.scaleMode = ig.System.SCALE.CRISP;
            }
            
            ig.System.scaleMode(this.canvas, this.context);
            
        }
        
    });
    
});
