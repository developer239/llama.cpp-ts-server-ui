import { Group, Switch, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from 'src/components/Header/Header.module.css'

export const Header = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme()
  const [isDark, { toggle }] = useDisclosure(colorScheme === 'dark')

  const handleToggleDarkMode = () => {
    setColorScheme(isDark ? 'light' : 'dark')
    toggle()
  }

  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%">
        <span className={classes['header-text']}>Llama.cpp UI</span>
        <Group justify="center">
          <Switch
            checked={isDark}
            onChange={handleToggleDarkMode}
            label="Light | Dark"
          />
        </Group>
      </Group>
    </header>
  )
}
