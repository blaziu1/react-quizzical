export default function Answer(props: any) {
    let backColor;
    if(props.isActive && !props.isVerified) {
        backColor = "#d5d7f3";
    } else if (props.isVerified && props.isCorrect) {
        backColor = "#8cce99";
    } else if (props.isActive && props.isVerified && !props.isCorrect) {
        backColor = '#f3d7dc'
    } else {
        backColor = '';
    }
    const styles = {
        backgroundColor: backColor,
        border: props.isActive ? "none" : "1px solid #293057"
    }

    return (
        <div className="answer" style={styles} onClick={props.toggle}>{props.value}</div>
    )
}