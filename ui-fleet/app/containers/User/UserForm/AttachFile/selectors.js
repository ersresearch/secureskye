/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:39:26 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-11-23 09:55:32
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAttachment = state => state.get('attachment', initialState);

const makeAttachmentInformation = () =>
  createSelector(selectAttachment, substate => substate.toJS());

export { selectAttachment, makeAttachmentInformation };
