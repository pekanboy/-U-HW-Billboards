import styles from './Button.module.css'

interface IButton {
    onClick: VoidFunction;
    text: string;
}

export const Button = ({onClick, text}: IButton) => {
  return (
      <button className={styles.container} onClick={onClick}>{text}</button>
  )
}