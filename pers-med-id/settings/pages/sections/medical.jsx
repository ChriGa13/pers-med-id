export function medical(props) {
    return (
        <Section
          title={<Text bold align="center">Medical</Text>}>
          <Text>
            Text
          </Text>
          <TextInput
            settingsKey="medical"
            label="Medical"
            type="text"
            placeholder="Medical"
          />
        </Section>
    );
}