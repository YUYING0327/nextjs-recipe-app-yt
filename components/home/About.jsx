import Text from '../text/Text';
import Title from '../text/Title';
import classes from './About.module.scss';

function About() {
  return (
    <div className={classes.about}>
      <Title className={classes.title}>What is meal khuj</Title>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, nam vitae eos modi, placeat velit molestias, ducimus laudantium labore non officiis eaque. Architecto eaque aspernatur ipsam unde, pariatur blanditiis obcaecati!
        <br />
        <br />
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi assumenda odio incidunt eum! Beatae alias, nesciunt corporis dignissimos necessitatibus qui. Aliquam ut, non consectetur perferendis quia repudiandae facilis deleniti temporibus.
      </Text>
    </div>
  );
}

export default About;
