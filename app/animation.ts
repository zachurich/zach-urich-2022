import React from 'react';

export const red = '#f05d5d';
export const yellow = '#ffe247';
export const grey = '#dddddd';

export const colors = [red, yellow, grey];

export type AnimationStateType = {
  path: number;
  color: string;
  updateValues: (
    newValues: Partial<AnimationStateType>,
  ) =>
    | React.Dispatch<React.SetStateAction<AnimationStateType>>
    | typeof newValues
    | void;
};

export const initialAnimationState = {
  path: 0,
  color: red,
  updateValues: (newValues: Partial<AnimationStateType>) => newValues,
};

export const AnimationContext = React.createContext<AnimationStateType>(
  initialAnimationState,
);
