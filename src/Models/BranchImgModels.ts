

export interface BranchImgList {
          id :string,
          name :string,
          description :string,
          path :string,
          type :string,
          branchId :string,
          addedBy :string,
          updatedBy :string,
   
          addedTime: Date,
          updateTime: Date,
}
export interface BranchImgAdd {
  name :string,
  description :string,
  type :string,
  branchId :string,
  addedBy :string,

}
export interface BranchImgUbd {
  name :string,
  description :string,
  type :string,
  branchId :string,
  updatedBy :string,

        }
