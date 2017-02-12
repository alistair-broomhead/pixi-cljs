Engine = function(width, height){
    var renderer = new PIXI.autoDetectRenderer(width, height);
    var stage = new PIXI.Container();
    var resources = {};
    var activeSprites = [];

    document.body.appendChild(renderer.view);
    renderer.autoResize = true;
    renderer.backgroundColor = 0x061639;

    function isObject(obj) {
        return (
            (typeof obj == 'object') && 
            (! Array.isArray(obj))
        );
    }

    function updateObject(target, updates){
        var keys = Object.keys(updates);
        for (var i = 0; i < keys.length; i++){
            var key = keys[i];
            var value = updates[key];

            if (value === undefined){
                // Remove keys by setting to undefined
                delete target[key];
            } else if (isObject(value)){
                // Recurse into sub-objects, creating them if there 
                // was not already a sub-object in place
                if (!isObject(target[key])) {
                    target[key] = {};
                }
                updateObject(target[key], value);
            } else {
                // And in the most simple case, just set the damn key
                target[key] = value;
            }
        };
    }
    function addResource(name, source){
        if (! resources.hasOwnProperty(name)){
            resources[name] = PIXI.loader.add(name, source);
        }
        return resources[name];
    }

    function animate(){
        requestAnimationFrame(animate);

        var activeSprites = stage.children;

        for (var i = activeSprites.length - 1; i >= 0 ; i--){
            var sprite = activeSprites[i];
            var processor = sprite.processor;
            updateObject(sprite, processor(sprite));

            if (!sprite.alive){
                stage.removeChild(sprite);
            }
        }

        renderer.render(stage);
    }

    animate();

    return {
        map: {},

        addSprite: function(name, processor, initial){
            var img = "png/" + name + ".png";
            var loader = addResource(name, img);
            
            loader.load(function(loader, resources){
                var sprite = new PIXI.Sprite(resources[name].texture);

                if (initial !== undefined)
                    updateObject(sprite, initial(sprite));

                sprite.alive = true;
                sprite.processor = processor
                stage.addChild(sprite);

                activeSprites.push({
                    'sprite': sprite,
                    'processor': processor
                });
            });
        },
    };
};