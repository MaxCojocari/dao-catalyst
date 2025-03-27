import { motion } from "motion/react";
import styles from "./progress.module.css";
import successProgress from "../../assets/images/success_progress.svg";
import { exhale } from "../../utils";

export type ProgressBarPosition = 1 | 2 | 3;

interface ProgressBarProps {
  firstStep: string;
  secondStep: string;
  thirdStep: string;
  position: ProgressBarPosition;
  finished: boolean;
}

export const ProgressBar = ({
  position,
  finished,
  firstStep,
  secondStep,
  thirdStep,
}: ProgressBarProps) => {
  return (
    <motion.div className={styles.progress_bar} {...exhale}>
      <div className={styles.progress_steps}>
        <div
          className={`${styles.progress_step} ${
            position > 1 || (position === 1 && finished)
              ? styles.finished
              : position === 1
              ? styles.active
              : ""
          }`}
        >
          {position > 1 || (position === 1 && finished) ? (
            <img src={successProgress} alt="success" />
          ) : (
            <h3>1</h3>
          )}
          <p>{firstStep}</p>
        </div>
        <div
          className={`${styles.progress_line} ${styles.solid} ${
            position > 1 ? styles.finished_line : ""
          }`}
        />
        <div
          className={`${styles.progress_step} ${
            position > 2 || (position === 2 && finished)
              ? styles.finished
              : position === 2
              ? styles.active
              : ""
          }`}
        >
          {position > 2 || (position === 2 && finished) ? (
            <img src={successProgress} alt="success" />
          ) : (
            <h3>2</h3>
          )}
          <p>{secondStep}</p>
        </div>
        <div
          className={`${styles.progress_line} ${
            position === 3 && finished
              ? styles.finished_line
              : (position === 3 && !finished) || (position === 2 && finished)
              ? styles.solid
              : ""
          }`}
        />
        <div
          className={`${styles.progress_step} ${
            position === 3 && finished
              ? styles.finished
              : position === 3
              ? styles.active
              : ""
          }`}
        >
          {position === 3 && finished ? (
            <img src={successProgress} alt="success" />
          ) : (
            <h3>3</h3>
          )}
          <p>{thirdStep}</p>
        </div>
      </div>
    </motion.div>
  );
};
