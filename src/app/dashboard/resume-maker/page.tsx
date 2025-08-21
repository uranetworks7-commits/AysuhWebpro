
"use client";

import { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2, Download, FileText, Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const resumeSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  summary: z.string().min(1, 'Summary is required'),
  experiences: z.array(z.object({
    title: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company name is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    description: z.string().min(1, 'Description is required'),
  })),
  education: z.array(z.object({
    school: z.string().min(1, 'School name is required'),
    degree: z.string().min(1, 'Degree is required'),
    gradYear: z.string().min(1, 'Graduation year is required'),
  })),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill is required'),
  })),
});

type ResumeFormData = z.infer<typeof resumeSchema>;

const ResumePreview = ({ getValues }: { getValues: () => ResumeFormData }) => {
  const values = getValues();

  if (!values.fullName) return <div className="text-center text-muted-foreground p-8">Fill out the form to see a preview</div>;

  return (
    <div className="p-8 bg-white text-black font-sans text-sm">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-tight">{values.fullName || 'Your Name'}</h1>
        <div className="flex justify-center items-center gap-4 text-xs text-gray-600 mt-2">
            <div className="flex items-center gap-1"><Mail className="h-3 w-3" /><span>{values.email || 'your.email@example.com'}</span></div>
            <div className="flex items-center gap-1"><Phone className="h-3 w-3" /><span>{values.phoneNumber || '(123) 456-7890'}</span></div>
            <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /><span>{values.address || 'Your City, State'}</span></div>
            {values.linkedin && <div className="flex items-center gap-1"><Linkedin className="h-3 w-3" /><span>{values.linkedin}</span></div>}
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-2">Summary</h2>
        <p className="text-gray-700">{values.summary || 'Professional summary about your skills and experience.'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-2">Experience</h2>
        {values.experiences?.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-bold">{exp.title || 'Job Title'}</h3>
              <p className="text-gray-600">{exp.startDate || 'Start'} - {exp.endDate || 'End'}</p>
            </div>
            <p className="italic text-gray-800">{exp.company || 'Company Name'}</p>
            <p className="text-gray-700 mt-1 whitespace-pre-wrap">{exp.description || 'Description of your responsibilities and achievements.'}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-2">Education</h2>
        {values.education?.map((edu, index) => (
          <div key={index} className="mb-2">
             <div className="flex justify-between">
                <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                <p className="text-gray-600">{edu.gradYear || 'Year'}</p>
             </div>
            <p className="italic text-gray-800">{edu.school || 'School Name'}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {values.skills?.map((skill, index) => (
            <span key={index} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill.name || 'Skill'}</span>
          ))}
        </div>
      </div>
    </div>
  );
};


export default function ResumeMakerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      linkedin: '',
      summary: '',
      experiences: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
      education: [{ school: '', degree: '', gradYear: '' }],
      skills: [{ name: '' }],
    },
  });

  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: 'experiences' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: 'skills' });

  const handleDownloadPdf = async () => {
    const input = resumePreviewRef.current;
    if (!input) return;

    setIsSubmitting(true);
    try {
        const canvas = await html2canvas(input, {
          scale: 2, 
          backgroundColor: '#ffffff' 
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`resume-${form.getValues('fullName').replace(' ', '-')}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Resume Maker</h1>
            <p className="text-muted-foreground">Fill in your details to generate a professional resume.</p>
          </div>
        </div>
        <Button onClick={handleDownloadPdf} disabled={isSubmitting}>
          {isSubmitting ? 'Generating...' : <><Download className="mr-2 h-4 w-4" /> Download PDF</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6">
                {/* Personal Details */}
                <Card>
                    <CardHeader><CardTitle className="text-lg">Personal Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="phoneNumber" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="City, State" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="linkedin" render={({ field }) => (<FormItem><FormLabel>LinkedIn Profile</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/johndoe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="summary" render={({ field }) => (<FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea placeholder="A brief professional summary..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                    <CardHeader><CardTitle className="text-lg">Work Experience</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                    {expFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                            <FormField control={form.control} name={`experiences.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name={`experiences.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name={`experiences.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="text" placeholder="Jan 2022" {...field} /></FormControl></FormItem>)} />
                                <FormField control={form.control} name={`experiences.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="text" placeholder="Present" {...field} /></FormControl></FormItem>)} />
                            </div>
                            <FormField control={form.control} name={`experiences.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ title: '', company: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
                    </CardContent>
                </Card>

                {/* Education */}
                <Card>
                     <CardHeader><CardTitle className="text-lg">Education</CardTitle></CardHeader>
                     <CardContent className="space-y-4">
                        {eduFields.map((field, index) => (
                            <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                                <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => (<FormItem><FormLabel>School/University</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree/Certificate</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={form.control} name={`education.${index}.gradYear`} render={({ field }) => (<FormItem><FormLabel>Graduation Year</FormLabel><FormControl><Input placeholder="2024" {...field} /></FormControl></FormItem>)} />
                                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ school: '', degree: '', gradYear: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
                     </CardContent>
                </Card>

                 {/* Skills */}
                <Card>
                    <CardHeader><CardTitle className="text-lg">Skills</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                    {skillFields.map((field, index) => (
                        <div key={field.id} className="flex items-end gap-2">
                           <FormField control={form.control} name={`skills.${index}.name`} render={({ field }) => (<FormItem className="flex-grow"><FormLabel>Skill</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                           <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    ))}
                     <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
                    </CardContent>
                </Card>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="lg:sticky lg:top-24 h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="bg-gray-100 rounded-md shadow-inner">
                <div ref={resumePreviewRef}>
                    <ResumePreview getValues={() => form.getValues()} />
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
