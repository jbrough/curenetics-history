module.exports = function () {
return `
graph TD
A[Have you got a confirmed diagnosis of prostate cancer?]
A-->|no|B[Please see your GP about your symptoms.]
A-->|yes|C[Are you having treatment?]
C-->|yes|TestQ1[Have you had a biopsy?]
C-->|no|D[Which one of these best describes your GP visits:]
D-->|watchful waiting|E[I visit the doctor when I have pain or symptoms]
D-->|active surveillance|F[I have regular doctors visits/tests ]
E-->TestQ1
F-->TestQ1
TestQ1-->|yes|TestQ2[Please provide your PSA, if known:]
TestQ1-->|no|TestQ5
TestQ2-->|yes|TestQ5a[Please provide your Gleason Group or Score, if known:]
TestQ5a-->|no|TestQ5
TestQ5a-->|yes|TestQ5
TestQ2-->|no|TestQ5[Have you had body scans?]
TestQ5-->|MRI|q6(MRI)
TestQ5-->|CT|q7(CT)
TestQ5-->|Bone|q8(Bone Scan)
D-->|none|J[Neither]
J-->x[Please see your GP about your symptoms.]
TestQ5-->|next|stage[At what stage is your cancer?]
stage-->|unknown|stage0[I don't know]
stage-->|localised|stage1[Localised within prostate]
stage-->|locally advanced|stage2[Locally advanced]
stage-->|metastatic|stage3[Metastatic]
stage-->|next|h3bb[Have you had a prostatectomy?]
h3bb-->|yes|h3b[Have you had any of the following focal treatments?]
h3bb-->|no|h3b
h3b-->|HiFu|h3c(HiFu Therapy)
h3b-->|cryo|h3d(Cryo Therapy)
h3b-->|hormone|h3e(Hormone Therapy)
h3b-->|next|h4b[Have you had Radiotherapy?]
h4b-->|no|dh1
h4b-->|yes|h6b[Please select your treatments:]
h6b-->|brachytherapy|h6c(Brachytherapy)
h6b-->|External beam|h6d(External Beam Radiotherapy)
h6b-->|Other|h6e(I've had Radiotherapy but don't remember which type)
h6b-->|next|dh1[Drug History]
stage0-->h3b
stage1-->h3b
stage2-->stage2a[Where has the cancer spread?]
stage2a-->|Seminal vesicles|stage2a1(Seminal vesicles)
stage2a-->|Bladder|stage2a2(Bladder)
stage2a-->|Lymph|stage2a3(Lymph Glands close to prostate)
stage2a-->|next|h3bc[Have you had chemotherapy?]
h3bc-->|yes|h3bb
h3bc-->|no|h3bb
stage3-->h2ca[Where has the cancer spread?]
h2ca-->|Bone|h2caa(Bones)
h2ca-->|Bladder|h2cab(Bladder)
h2ca-->|Lymph|h2cac(Lymph Glands)
h2ca-->|Lung|h2caf(Lungs)
h2ca-->|next|h5bc[have you had chemotherapy?]
h5bc-->|no|h6
h5bc-->|yes|h5bb[Have you had any of the following treatments?]
h5bb-->|next|h6
h5bb-->|Docetaxel|h5bf(Docetaxel)
h5bb-->|Cabazitaxel|h5bd(Cabazitaxe)
h5bb-->|Sipuleucel-T|h5be(Sipuleucel-T)
h6[Have you had any drug therapy?]
h6-->|Abiraterone|h6bd(Abiraterone)
h6-->|Enzalutamide|h6be(Enzalutamide)
h6-->|Radium-223|h6bf(Radium 223 injection radiotherapy)
`
}
