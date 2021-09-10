import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon } from '@wordpress/components';
import './index.scss';

wp.blocks.registerBlockType("ourplugin/react-block-type", {

    title: "React Block Type",
    icon: "smiley",
    category: "common",
    attributes: {
        question: {type: "string"},
      answers: { type: "array", default: ["white", "green", "black"] },
      correctAnswer: {type: "number", default: undefined}
    },
    edit: EditComponent,
    save: function () {
    return null
    }
})

function EditComponent (props) {
  
    function updateQuestion(value) {
      props.setAttributes({question: value})
    }
  
    function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter(function (x, index) {
          return index != indexToDelete
      })
      props.setAttributes({ answers: newAnswers })
      
      if (indexToDelete == props.attributes.correctAnswer) {
        props.setAttributes({correctAnswer: undefined})
      }
    }
  
  function markAsCorrect(index) {
    props.setAttributes({correctAnswer: index})
  }

    return (
      <div className="paying-attention-edit-block">
        <TextControl  label="Question: " value={props.attributes.question} onChange={updateQuestion} style={{ fontSize: "20px" }} />
        <p style={{fontSize: "13px", margin:"20px 0 8px 0"}} >Answers:</p>
        {props.attributes.answers.map( (answer, index)=> {
          return (
        <Flex>
            <FlexBlock>
                <TextControl
                  autoFocus={answer == undefined}
                  value={answer} onChange={newValue => {
                  const newAnswers = props.attributes.answers.concat([])
                  newAnswers[index] = newValue
                  props.setAttributes({answers: newAnswers})
                }} />
            </FlexBlock>
            <FlexItem>
              <Button onClick={()=> markAsCorrect(index)}>
                <Icon className="mark-as-correct" icon={props.attributes.correctAnswer == index ? "star-filled" : "star-empty"}></Icon>
              </Button>            
            </FlexItem>
            <FlexItem>
                <Button isLink className="attention-delete" onClick={() => deleteAnswer(index)}>Delete</Button>
            </FlexItem>
        </Flex>
            )
        })}
        <Button onClick={() => {
          props.setAttributes({answers: props.attributes.answers.concat(undefined) })
        }} isPrimary >Add another answer</Button>
      </div>
    )
  }