export function patient(props) {
    return (
        <Section
          title={<Text bold align="center">Patient</Text>}>
          <Text>
            Text
          </Text>
          <TextInput
            settingsKey="name"
            label="Name"
            type="text"
            placeholder="Name"
          />
        </Section>
    );
}