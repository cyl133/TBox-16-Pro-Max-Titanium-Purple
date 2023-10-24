import { getButtonColorFromDifficulty } from '@renderer/constants'
import { DifficultyEnum } from '@renderer/types/types'

export const DifficultyComponentRow = ({
  difficultySelected,
  onClick
}: {
  difficultySelected: DifficultyEnum
  onClick: (difficulty: DifficultyEnum) => void
}) => {
  return (
    <div
      style={{
        flexDirection: 'row',
        flex: 1,
        display: 'flex'
      }}
    >
      <SelectableButton
        text={DifficultyEnum.EASY}
        color={getButtonColorFromDifficulty(DifficultyEnum.EASY)}
        isSelected={difficultySelected === DifficultyEnum.EASY}
        onClick={onClick}
      />
      <SelectableButton
        text={DifficultyEnum.MEDIUM}
        color={getButtonColorFromDifficulty(DifficultyEnum.MEDIUM)}
        isSelected={difficultySelected === DifficultyEnum.MEDIUM}
        onClick={onClick}
      />
      <SelectableButton
        text={DifficultyEnum.HARD}
        color={getButtonColorFromDifficulty(DifficultyEnum.HARD)}
        isSelected={difficultySelected === DifficultyEnum.HARD}
        onClick={onClick}
      />
    </div>
  )
}

const SelectableButton = ({
  text,
  color,
  isSelected,
  onClick
}: {
  text: DifficultyEnum
  color: string
  isSelected: boolean
  onClick: (difficulty: DifficultyEnum) => void
}): JSX.Element => {
  const getStyle = () => {
    const baseStyle = {
      borderRadius: '5px',
      marginRight: '15px',
      width: '80px',
      minWidth: '100px',
      height: '30px',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      cursor: 'pointer',
      display: 'flex',
      fontWeight: '500'
    }
    if (isSelected) {
      return {
        ...baseStyle,
        border: `1px solid ${color}`,
        backgroundColor: color,
        color: 'white'
      }
    } else {
      return {
        ...baseStyle,
        border: `1px solid ${color}`,
        color: color
      }
    }
  }

  return (
    <div style={getStyle()} onClick={(): void => onClick(text)}>
      {text.toUpperCase()}
    </div>
  )
}
