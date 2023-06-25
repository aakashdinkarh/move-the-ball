function projectileMotion({vy = 0, vx = 1, dy = 1, dx = 1} = {}) {
    clearInterval(intervalId);

    intervalId = setInterval(() => {
        if(vy === 0 && isEdgeTouch('bottom') && vx === 0){
            clearInterval(intervalId);
            return;
        }

        showDirectionOfThrow({ clientX: storedMouseCoordinates.x, clientY: storedMouseCoordinates.y });

        showTrajectory();

        if(!isEdgeTouch('bottom') || vy !== 0){
            [vx, vy, dx, dy] = moveTheBallVertically({ vy, dy, vx, dx });
        }
        if(vx !== 0){
            [vx, dx] = moveTheBallHorizontally({ vx, dx });
        }
        if(isEdgeTouch('bottom') || isEdgeTouch('top')){
            [vx, vy, dy] = verticallyEdgeTouchEffect({ vx, vy, dy });
        }
        if(isEdgeTouch('left') || isEdgeTouch('right')){
            [vx, dx] = horizontallyEdgeTouchEffect({ vx, dx });
        }
    }, frameRate)
}
