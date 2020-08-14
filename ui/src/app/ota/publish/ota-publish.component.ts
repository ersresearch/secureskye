import { Component, OnInit } from '@angular/core';
import { ota } from '../../shared/model';
import { Router, ActivatedRoute } from '@angular/router';
import { OtaService } from '../ota.service';
import { GlobalDialogService } from '../../shared/service';
import { TreeNode, ITreeOptions } from 'angular-tree-component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-ota-publish',
  templateUrl: './ota-publish.component.html',
  styleUrls: ['./ota-publish.component.scss']
})
export class OtaPublishComponent implements OnInit {

  /**
   * Uploaded archive ID
   */
  otaId: string;
  /**
   * Metadata info
   */
  metadata: ota.vehicle.IMetadataProto;
  /**
   * Expanding ECU ID
   */
  expandingId: string;
  /**
   * Displaying ECU / IMG ID
   */
  displayingId: string;
  /**
   * Displaying ECU info
   */
  displayingEcu: ota.vehicle.IEcuProto;
  /**
   * Displaying IMG info
   */
  displayingImg: ota.vehicle.IImageProto;
  /**
   * Treeview model
   */
  ecuNodes: any[];
  /**
   * Treeview options
   */
  treeviewOpts: ITreeOptions;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private otaService: OtaService,
    private globalDialogService: GlobalDialogService
  ) { }

  ngOnInit() {
    const self = this;

    // treeview options
    self.treeviewOpts = {
    };

    self.route.params.subscribe((params) => {
      self.otaId = params.otaId;

      // Get image archive metadata
      self.otaService.getImageArchiveMetadata(self.otaId).subscribe((resp) => {
        self.metadata = resp;
        self.ecuNodes = self.metadata.ecus.map(ecu => ({
          id: ecu.id,
          name: ecu.id,
          data: ecu,
          children: ecu.images.map(img => ({
            id: img.id,
            name: img.name,
            data: img
          }))
        }));
      });
    });
  }

  /**
   * Publish ota image archive to clients
   */
  publish() {
    const self = this;

    self.otaService.publishImageArchiveMetadata(self.otaId).subscribe(
      (resp) => {
        self.globalDialogService.success('Published successfully.');
      },
      (err) => {
        self.globalDialogService.error(err);
      });
  }

  /**
   * Remove this archive
   */
  remove() {
    const self = this;

    self.globalDialogService.delete(`archive ${self.otaId}`).subscribe((agreed) => {
      if (agreed) {
        self.otaService.remove(self.otaId).subscribe(() => {
          self.router.navigate(['..'], { relativeTo: self.route, replaceUrl: true });
        }, (err) => self.globalDialogService.error(err));
      }
    });
  }

  /**
   * Loading ecu / image info when clicked
   * @param item ecu / image
   */
  load(nodeEvent: any) {
    const self = this;

    // Data of actived node
    const activatedNode = nodeEvent.node as TreeNode;
    const item = activatedNode.data.data;

    // clear
    self.displayingEcu = null;
    self.displayingImg = null;

    // set info to be displayed
    self.displayingId = item.id;
    if (item instanceof ota.vehicle.EcuProto) {
      self.expandingId = item.id;
      self.displayingEcu = item;
    } else if (item instanceof ota.vehicle.ImageProto) {
      self.displayingImg = item;
    }
  }

  /**
   * Download displaying image file
   */
  downloadImg() {
    const self = this;
    return self.otaService.downloadImg(self.displayingImg).pipe(
      catchError(err => self.globalDialogService.error(err))
    );
  }
}
