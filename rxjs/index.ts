import { SnackBarModel } from "./../models/snackBarModel.interface"
import { Subject } from "rxjs"
import { ModalModel } from "../models/modalModel.interface"

export const modalHandler$ = new Subject<ModalModel>()
export const refreshDataSub$ = new Subject<boolean>()
export const refreshDiffData$ = new Subject<boolean>()
export const loadingHandler$ = new Subject<boolean>()
export const snackbarHandler$ = new Subject<SnackBarModel>()
